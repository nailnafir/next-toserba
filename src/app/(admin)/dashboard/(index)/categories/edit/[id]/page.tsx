import { EditPageProps } from "@/app/interfaces";
import { getCategoriesById } from "../../lib/data";
import CategoriesForm from "../../_components/categories-form";

export default async function EditPage({ params }: EditPageProps) {
  const data = await getCategoriesById(params.id);

  return <CategoriesForm type="edit" data={data} />;
}
