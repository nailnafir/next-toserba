import { EditPageProps } from "@/app/interfaces";
import LocationsForm from "../../_components/locations-form";
import { getLocationsById } from "../../lib/data";

export default async function EditPage({ params }: EditPageProps) {
  const data = await getLocationsById(params.id);

  return <LocationsForm type="edit" data={data} />;
}
