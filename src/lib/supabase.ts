import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKEY = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

const supabase = createClient(supabaseURL, supabaseKEY);

const bucket = "toserba";

export function getImageURL(
  fileName: string | undefined,
  path: "brands" | "products"
) {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(`public/${path}/${fileName}`);

  return data;
}

export async function uploadFile(files: File[], path: "brands" | "products") {
  const uploadedFiles: Array<{
    id: string;
    path: string;
    fullPath: string;
  } | null> = [];
  
  for (const file of files) {
    const fileType = file.type.split("/")[1];
    const fileName = `${path}-${Date.now()}.${fileType}`;

    const fullPath = `public/${path}/${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fullPath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Failed to upload files", error);
    } else {
      console.log("Uploaded files", data);
    }

    uploadedFiles.push(data);
  }

  return uploadedFiles;
}

export async function deleteFile(
  fileNames: string[],
  path: "brands" | "products"
) {
  const fullPaths = fileNames.map((fileName) => `public/${path}/${fileName}`);

  const { data, error } = await supabase.storage.from(bucket).remove(fullPaths);

  if (error) {
    console.error("Failed to delete files", error);
  } else {
    console.log("Deleted files", data);
  }

  return data;
}
