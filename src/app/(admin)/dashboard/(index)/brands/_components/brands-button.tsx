"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader, Trash } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { ActionResult } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { DeleteBrands } from "../lib/action";
import { ActionButtonProps } from "@/app/interfaces";

const initialState: ActionResult = {
  message: "",
};

export default function BrandsButton({ id, buttonType }: ActionButtonProps) {
  const DeleteBrandsWithId = (_: unknown) => DeleteBrands(_, id);

  const { toast } = useToast();

  const { pending } = useFormStatus();

  const [state, formAction] = useFormState(DeleteBrandsWithId, initialState);

  if (state.message) {
    toast({
      variant: "destructive",
      title: "Kesalahan",
      description: state.message,
    });
  }

  return (
    <>
      {buttonType === "save" && (
        <Button type="submit" size="sm" disabled={pending}>
          {pending && <Loader className="animate-spin" />}
          {pending ? "Mohon tunggu...." : "Simpan Merek"}
        </Button>
      )}
      {buttonType === "delete" && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Yakin mau hapus?</AlertDialogTitle>
              <AlertDialogDescription>
                Merek akan dihapus dari penyimpanan dan tidak dapat
                dikembalikan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form action={formAction}>
              <AlertDialogFooter>
                <AlertDialogCancel>Batalkan</AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  className={buttonVariants({ variant: "destructive" })}
                >
                  Hapus
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}