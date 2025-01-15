import { EditPageProps } from "@/app/interfaces";
import { getBrandsById } from "../../lib/data";
import BrandsForm from "../../_components/brands-form";

export default async function EditPage({ params }: EditPageProps) {
  const data = await getBrandsById(params.id);

  return <BrandsForm type="edit" data={data} />;
}
