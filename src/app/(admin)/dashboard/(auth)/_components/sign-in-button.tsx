import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full text-white" disabled={pending}>
      {pending && <Loader className="animate-spin" />}
      {pending ? "Mohon tunggu...." : "Masuk"}
    </Button>
  );
}