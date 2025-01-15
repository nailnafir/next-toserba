import ProductsForm from "../_components/products-form";
import { getBrands } from "../../brands/lib/data";
import { getCategories } from "../../categories/lib/data";
import { getLocations } from "../../locations/lib/data";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function CreatePage() {
  const categories = await getCategories();
  const brands = await getBrands();
  const locations = await getLocations();

  return (
    <ProductsForm type="add" data={null}>
      <Card>
        <CardHeader>
          <CardTitle>Kategori Produk</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="grid gap-3">
              <Label htmlFor="categories">Kategori</Label>
              <Select name="categoryId">
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
              <Select name="brandId">
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
              <Select name="locationId">
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
