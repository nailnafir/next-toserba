"use server";

import { getUser } from "@/lib/auth";
import { schemaOrders } from "@/lib/schema";
import { ActionResult, CartProduct } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../lib/prisma";
import { generateRandomString } from "@/lib/utils";
import {
  PaymentRequestParameters,
  PaymentRequest,
} from "xendit-node/payment_request/models";
import xenditClient from "@/lib/xendit";
import { Prisma } from "@prisma/client";

export async function CreateOrders(
  _: unknown,
  formData: FormData,
  total: number,
  products: CartProduct[]
): Promise<ActionResult> {
  const { session, user } = await getUser();

  if (!session) {
    return {
      message: "Tidak sah",
    };
  }

  const validate = schemaOrders.safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
    phone: formData.get("phone"),
    notes: formData.get("notes"),
  });

  if (!validate.success) {
    return {
      message: validate.error.errors[0].message,
    };
  }

  let redirectPaymentURL = "/";

  try {
    const order = await prisma.order.create({
      data: {
        total: total,
        status: "pending",
        userId: user.id,
        code: generateRandomString(12),
      },
    });

    const data: PaymentRequestParameters = {
      amount: total,
      paymentMethod: {
        ewallet: {
          channelProperties: {
            successReturnUrl: process.env.NEXT_PUBLIC_REDIRECT_URL,
          },
          channelCode: "SHOPEEPAY",
        },
        reusability: "ONE_TIME_USE",
        type: "EWALLET",
      },
      currency: "IDR",
      referenceId: order.code,
    };

    const xenditPayment: PaymentRequest =
      await xenditClient.PaymentRequest.createPaymentRequest({
        data: data,
      });

    redirectPaymentURL =
      xenditPayment.actions?.find((value) => value.urlType === "DEEPLINK")
        ?.url ?? "/";

    const queryCreateProductOrders: Prisma.OrderProductCreateManyInput[] = [];

    for (const product of products) {
      queryCreateProductOrders.push({
        orderId: order.id,
        productId: product.id,
        quantity: product.quantity,
        subTotal: product.price,
      });
    }

    await prisma.orderProduct.createMany({
      data: queryCreateProductOrders,
    });

    await prisma.orderDetail.create({
      data: {
        name: validate.data.name,
        address: validate.data.address,
        city: validate.data.city,
        phone: validate.data.phone,
        postalCode: validate.data.postalCode,
        notes: validate.data.notes,
        orderId: order.id,
      },
    });
  } catch (error) {
    console.log("Failed to create orders", error);

    return {
      message: "Terjadi kesalahan pada saat membuat pesanan",
    };
  }

  return redirect(redirectPaymentURL);
}
