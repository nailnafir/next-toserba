import { OrdersColumn } from "@/types";
import prisma from "../../../../../../../lib/prisma";
import { getImageURL } from "@/lib/supabase";

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    const response: OrdersColumn[] = orders.map((order) => {
      return {
        id: order.id,
        customerName: order.user.name,
        price: Number(order.total),
        status: order.status,
        products: order.products.map((orderProduct) => {
          return {
            name: orderProduct.product.name,
            image: getImageURL(orderProduct.product.images[0], "brands")
              .publicUrl,
          };
        }),
      };
    });

    return response;
  } catch (error) {
    console.log(`Get Orders Error: ${error}`);
    return [];
  }
}
