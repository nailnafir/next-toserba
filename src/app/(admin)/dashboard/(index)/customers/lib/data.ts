import { CustomersColumn } from "@/types";
import prisma from "../../../../../../../lib/prisma";

export async function getCustomers() {
  try {
    const customers = await prisma.user.findMany({
      where: {
        role: "customer",
      },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    const response: CustomersColumn[] = customers.map((customer) => {
      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        totalTransactions: customer._count.orders,
      };
    });

    return response;
  } catch (error) {
    console.log(`Get Customers Error: ${error}`);
    return [];
  }
}
