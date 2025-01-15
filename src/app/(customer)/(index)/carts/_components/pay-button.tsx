import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function PayButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white"
    >
      {pending && <Loader className="animate-spin" />}
      {pending ? "Mohon tunggu...." : "Bayar Sekarang"}
    </button>
  );
}
