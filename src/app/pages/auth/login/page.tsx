"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      router.push("/pages/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/pages/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 p-4">
      <Card className="w-full max-w-md shadow-lg border-zinc-200">
        <CardHeader className="space-y-3">
          <CardTitle className="text-3xl text-center font-bold text-zinc-800">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-zinc-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <Alert variant="default" className="border-emerald-600 bg-emerald-50">
                <AlertDescription className="text-emerald-700">{message}</AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive" className="bg-rose-50">
                <AlertDescription className="text-rose-700">{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-800">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-11 border-zinc-300 focus:border-violet-600 focus:ring-violet-600"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-800">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-11 pr-10 border-zinc-300 focus:border-violet-600 focus:ring-violet-600"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link 
                href="/pages/auth/forgot-password" 
                className="text-sm text-black hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-slate-900 hover:bg-slate-600  text-white transition-colors"
            >
              Sign in
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-zinc-600">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="mt-4 w-full flex items-center justify-center gap-3 px-4 py-3 border border-zinc-300 rounded-md bg-white text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400 transition-colors"
            >
              <img
                className="h-5 w-5"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
              />
              <span className="text-sm font-medium">Sign in with Google</span>
            </button>
          </div>
        </CardContent>
        
        <CardFooter className="justify-center pt-4">
          <div className="flex items-center gap-2 text-zinc-600">
            <span>Don't have an account?</span>
            <Link 
              href="/pages/auth/register" 
              className="text-black   hover:underline transition-colors font-medium"
            >
              Register now
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}