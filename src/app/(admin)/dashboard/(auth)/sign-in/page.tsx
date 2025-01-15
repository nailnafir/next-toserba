"use client";

import ParticlesBackground from "@/components/ui/particles-background";
import SignInForm from "../_components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="relative min-h-screen w-full bg-primary flex items-center justify-center">
      <ParticlesBackground />
      <div className="relative z-10">
        <SignInForm />
      </div>
      <div className="absolute inset-0 bg-black/25 z-0"></div>
    </div>
  );
}
