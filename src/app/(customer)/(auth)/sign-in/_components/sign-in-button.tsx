"use client";

import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`${
        pending ? "bg-gray-300" : "bg-[#0D5CD7]"
      } p-[12px_24px] inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold text-white`}
      disabled={pending}
    >
      {pending && <Loader className="animate-spin" />}
      {pending ? "Mohon tunggu...." : "Masuk"}
    </button>
  );
}
