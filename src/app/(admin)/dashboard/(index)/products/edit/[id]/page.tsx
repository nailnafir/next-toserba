import ProductsForm from "../../_components/products-form";
import { EditPageProps } from "@/app/interfaces";
import { getProductById } from "../../lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getCategories } from "../../../categories/lib/data";
import { getBrands } from "../../../brands/lib/data";
import { getLocations } from "../../../locations/lib/data";

export default async function EditPage({ params }: EditPageProps) {
  const data = await getProductById(params.id);

  const categories = await getCategories();
  const brands = await getBrands();
  const locations = await getLocations();

  return (
    <ProductsForm type="edit" data={data}>
      <Card>
        <CardHeader>
          <CardTitle>Kategori Produk</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="grid gap-3">
              <Label htmlFor="categories">Kategori</Label>
              <Select name="categoryId" defaultValue={`${data?.categoryId}`}>
                <SelectTrigger id="categories" aria-label="Select categories">
                  <SelectValue placeholder="Pilih Kategori...." />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={`${category.id}`}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="brand">Merek</Label>
              <Select name="brandId" defaultValue={`${data?.brandId}`}>
                <SelectTrigger id="brands" aria-label="Select brands">
                  <SelectValue placeholder="Pilih Merek...." />
                </SelectTrigger>
                <SelectContent>
                  {brands?.map((brand) => (
                    <SelectItem key={brand.id} value={`${brand.id}`}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="locations">Lokasi</Label>
              <Select name="locationId" defaultValue={`${data?.locationId}`}>
                <SelectTrigger id="locations" aria-label="Select locations">
                  <SelectValue placeholder="Pilih Lokasi...." />
                </SelectTrigger>
                <SelectContent>
                  {locations?.map((location) => (
                    <SelectItem key={location.id} value={`${location.id}`}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </ProductsForm>
  );
}
