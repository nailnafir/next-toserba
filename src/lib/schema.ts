import { z } from "zod";

export const ALLOW_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png"];

export const schemaSignIn = z.object({
  email: z
    .string({ required_error: "Email harus diisi" })
    .email({ message: "Email tidak valid" }),
  password: z
    .string({ required_error: "Password harus diisi" })
    .min(6, { message: "Password minimal 6 karakter" }),
});

export const schemaSignUp = z.object({
  name: z
    .string({ required_error: "Nama harus diisi" })
    .min(6, { message: "Nama minimal 6 karakter" }),
  email: z
    .string({ required_error: "Email harus diisi" })
    .email({ message: "Email tidak valid" }),
  password: z
    .string({ required_error: "Password harus diisi" })
    .min(6, { message: "Password minimal 6 karakter" }),
});

export const schemaCategories = z.object({
  name: z
    .string({ required_error: "Nama harus diisi" })
    .min(2, { message: "Nama minimal 2 karakter" }),
});

export const schemaLocations = z.object({
  name: z
    .string({ required_error: "Nama harus diisi" })
    .min(2, { message: "Nama minimal 2 karakter" }),
});

export const schemaBrands = z.object({
  name: z
    .string({ required_error: "Nama harus diisi" })
    .min(2, { message: "Nama minimal 2 karakter" }),
  logo: z
    .any()
    .refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), {
      message: "File tidak didukung",
    })
    .refine((file: File) => file.size < 1024 * 1024 * 2, {
      message: "File terlalu besar",
    })
    .refine((file: File) => file.name, { message: "File harus diisi" }),
});

export const schemaProducts = z.object({
  name: z
    .string({ required_error: "Nama harus diisi" })
    .min(2, { message: "Nama minimal 2 karakter" }),
  description: z
    .string({ required_error: "Deskripsi harus diisi" })
    .min(8, { message: "Deskripsi minimal 8 karakter" }),
  price: z.string({ required_error: "Harga harus diisi" }),
  stock: z.string({ required_error: "Stok harus diisi" }),
  categoryId: z.string({ required_error: "Kategori harus diisi" }),
  brandId: z.string({ required_error: "Merek harus diisi" }),
  locationId: z.string({ required_error: "Lokasi harus diisi" }),
  images: z
    .any()
    .refine((files: File[]) => files.length === 3, {
      message: "Harap isi 3 foto produk",
    })
    .refine(
      (files: File[]) => {
        let validate = false;

        Array.from(files).find((file) => {
          validate = ALLOW_MIME_TYPES.includes(file.type);
        });

        return validate;
      },
      {
        message: "Foto yang dipilih harus berupa gambar",
      }
    ),
});

export const schemaOrders = z.object({
  name: z
    .string({ required_error: "Nama harus diisi" })
    .min(6, { message: "Nama minimal 6 karakter" }),
  address: z
    .string({ required_error: "Alamat harus diisi" })
    .min(12, { message: "Alamat minimal 12 karakter" }),
  city: z
    .string({ required_error: "Kota harus diisi" })
    .min(2, { message: "Kota minimal 2 karakter" }),
  postalCode: z
    .string({ required_error: "Kode pos harus diisi" })
    .min(2, { message: "Kode pos minimal 2 karakter" }),
  phone: z
    .string({ required_error: "Telepon harus diisi" })
    .min(10, { message: "Telepon minimal 10 karakter" }),
  notes: z.string().nullable(),
});
