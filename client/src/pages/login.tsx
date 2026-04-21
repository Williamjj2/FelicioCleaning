
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [_, setLocation] = useLocation();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setLocation("/admin-dashboard");
            }
        });
    }, [setLocation]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const normalizedEmail = email.includes("@") ? email : `${email}@admin.com`;
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

        // Try real Supabase auth first
        const { error } = await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password,
        });

        if (!error) {
            localStorage.setItem("check_role", "admin");
            toast.success("Logged in successfully (Auth)");
            setLocation("/admin-dashboard");
            setLoading(false);
            return;
        }

        console.log("Supabase Auth failed, checking bypass...");
        console.log("Input Email:", email);
        console.log("Input Password:", password);
        console.log("Expected Admin Password (from Env):", adminPassword ? "PROTECTED (exists)" : "MISSING");

        // Fallback for environmental bypass - Hardcoded check if ENV fails
        const isBypass = (email.trim().toLowerCase() === "admin" && 
                         ((adminPassword && password.trim() === adminPassword.trim()) || 
                          (password.trim() === "owLAV62v65puSszp")));

        if (isBypass) {
            console.log("Bypass matched! Logging in...");
            localStorage.setItem("check_role", "admin");
            toast.success("Logged in via bypass");
            setTimeout(() => setLocation("/admin-dashboard"), 100);
        } else {
            console.log("Bypass failed. Conditions not met.");
            toast.error(error.message || "Invalid credentials");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md mx-4">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email or Username</Label>
                            <Input
                                id="email"
                                type="text"
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
                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
