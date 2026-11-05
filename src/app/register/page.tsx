
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signUp } from "@/lib/auth-client";

const passwordValid = (p: string) => /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(p);

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordValid(password)) {
      toast.error(
        "Password must be at least 6 characters with one uppercase and one lowercase letter",
      );
      return;
    }
    setLoading(true);
    try {
      const { error } = await signUp.email({
        name,
        email,
        password,
        image,
      });
      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      toast.success("Account created");
      router.push("/");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signIn.social({ provider: "google", callbackURL: "/" });
      // window.location.href = "/";
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-[#24352D] dark:text-white">
        Register
      </h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="dark:text-gray-200">
            Full Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="dark:border-[#34483D] dark:bg-[#1B2922] dark:text-white dark:placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="dark:text-gray-200">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="dark:border-[#34483D] dark:bg-[#1B2922] dark:text-white dark:placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image" className="dark:text-gray-200">
            Photo URL
          </Label>
          <Input
            id="image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="dark:border-[#34483D] dark:bg-[#1B2922] dark:text-white dark:placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="dark:text-gray-200">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="dark:border-[#34483D] dark:bg-[#1B2922] dark:text-white dark:placeholder:text-gray-500"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <div className="my-4 flex items-center gap-2">
        <div className="h-px flex-1 bg-[#E8E3D9] dark:bg-[#34483D]" />
        <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
        <div className="h-px flex-1 bg-[#E8E3D9] dark:bg-[#34483D]" />
      </div>

      <Button
        variant="outline"
        className="w-full dark:border-[#34483D] dark:bg-[#1B2922] dark:text-white dark:hover:bg-[#24352D]"
        onClick={handleGoogle}
      >
        Continue with Google
      </Button>

      <p className="mt-6 text-center text-sm dark:text-gray-300">
        Already have an account?{" "}
        <Link href="/login" className="text-[#C58B55] hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
