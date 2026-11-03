"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signIn.email({ email, password });
      if (error) {
        toast.error(error.message || "Login failed");
        return;
      }
      toast.success("Logged in successfully");
      router.push("/");
    } catch (err) {
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
      <h1 className="mb-6 text-3xl font-bold text-[#24352D]">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="button"
          className="text-sm text-[#C58B55] hover:underline"
        >
          Forgot Password?
        </button>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="my-4 flex items-center gap-2">
        <div className="h-px flex-1 bg-[#E8E3D9]" />
        <span className="text-sm text-gray-500">or</span>
        <div className="h-px flex-1 bg-[#E8E3D9]" />
      </div>

      <Button variant="outline" className="w-full" onClick={handleGoogle}>
        Continue with Google
      </Button>

      <p className="mt-6 text-center text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="text-[#C58B55] hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}