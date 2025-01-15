"use client";

import Image from "next/image";
import SignInButton from "./sign-in-button";
import { useFormState } from "react-dom";
import { useState } from "react";
import { SignIn } from "../../lib/action";
import { ActionResult } from "@/types";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const initialState: ActionResult = {
  message: "",
};

export default function SignInForm() {
  const [state, formAction] = useFormState(SignIn, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      action={formAction}
      className="w-[500px] bg-white p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
    >
      <div className="flex justify-center">
        <Image
          src="./assets/logos/logo-black.svg"
          width={157}
          height={42}
          alt="logo"
        />
      </div>
      <h1 className="font-bold text-2xl text-black leading-[34px]">Masuk</h1>
      {state.message !== "" && (
        <div className="border border-red-500 text-red-500 p-2 rounded">
          <h2 className="font-semibold">Kesalahan</h2>
          <p className="text-sm">{state.message}</p>
        </div>
      )}
      <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
        <div className="flex shrink-0">
          <Image
            src="./assets/icons/sms.svg"
            width={24}
            height={24}
            alt="icon"
          />
        </div>
        <input
          type="email"
          id="email"
          name="email"
          className="bg-white outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
          placeholder="Masukkan email disini...."
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
          <div className="flex shrink-0">
            <Image
              src="./assets/icons/lock.svg"
              width={24}
              height={24}
              alt="icon"
            />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="bg-white outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
            placeholder="Masukkan kata sandi disini...."
          />
          <button
            type="button"
            className="reveal-password flex shrink-0"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOff className="h-6 w-6 text-black" />
            ) : (
              <Eye className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <SignInButton />
        <Link
          href="/sign-up"
          className="p-[12px_24px] text-black bg-white text-center font-semibold underline"
        >
          Belum punya akun? Daftar disini
        </Link>
      </div>
    </form>
  );
}
