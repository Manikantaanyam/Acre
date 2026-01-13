"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);

  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard");
    }
  }, [session]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <button
        onClick={() => signIn("google")}
        className="text-black bg-[#86ff2e] px-6 py-2"
      >
        Sign in with Google
      </button>
    </div>
  );
}
