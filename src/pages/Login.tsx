import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      toast.success("Welcome back!");
      // Redirect based on role — checked after login
      const isAdmin = email === "admin@kicks.com";
      navigate(isAdmin ? "/admin" : "/shop");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="w-full max-w-md animate-scale-in rounded-lg border border-border bg-card p-8 shadow-card">
          <h1 className="text-center font-display text-2xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full shadow-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">Sign up</Link>
          </p>

          <div className="mt-6 rounded-md bg-accent p-3 text-xs text-accent-foreground">
            <p className="font-semibold">Demo credentials:</p>
            <p>Admin: admin@kicks.com / admin123</p>
            <p>User: user@kicks.com / user123</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
