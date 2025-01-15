"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ActionResult } from "@/types";
import { useFormState } from "react-dom";
import { SignOut } from "../lib/action";
import { useToast } from "@/hooks/use-toast";

const initialState: ActionResult = {
  message: "",
};

export default function SignOutButton() {
  const { toast } = useToast();

  const [state, formAction] = useFormState(SignOut, initialState);

  if (state.message) {
    toast({
      variant: "destructive",
      title: "Kesalahan",
      description: state.message,
    });
  }

  return (
    <form action={formAction}>
      <DropdownMenuItem className="focus:bg-red-500 focus:text-white p-0">
        <button type="submit" className="w-full h-full p-2 text-start">Keluar</button>
      </DropdownMenuItem>
    </form>
  );
}
