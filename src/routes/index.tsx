import { createFileRoute, redirect } from "@tanstack/react-router";
import { Home } from "../pages/Home";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("macos-web-auth") : null;
    let status: string | null = null;
    try {
      status = raw ? (JSON.parse(raw)?.status ?? null) : null;
    } catch {
      status = null;
    }
    if (status !== "authenticated") {
      throw redirect({ to: "/login" });
    }
  },
  component: Home,
});
