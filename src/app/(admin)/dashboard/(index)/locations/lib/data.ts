import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function getLocations() {
  try {
    const locations = await prisma.location.findMany({});
    
    return locations;
  } catch (error) {
    console.log(`Get Locations Error: ${error}`);
    return [];
  }
}

export async function getLocationsById(id: string) {
  try {
    const locations = await prisma.location.findFirst({
      where: { 
        id: Number.parseInt(id)
       },
    });
    
    return locations;
  } catch (error) {
    console.log(`Get Locations By Id Error: ${error}`);
    return redirect("/dashboard/locations");
  }
}
