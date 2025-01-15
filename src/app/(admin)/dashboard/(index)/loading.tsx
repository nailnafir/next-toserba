import { Loader } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="items-center justify-center m-auto w-full h-full flex">
      <Loader className="animate-spin w-12 h-12" />
    </div>
  );
}
