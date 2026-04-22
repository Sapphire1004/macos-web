import { createFileRoute, redirect } from "@tanstack/react-router";
import { readAuthState } from "../contexts/auth";
import { Home } from "../pages/Home";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (readAuthState().status !== "authenticated") {
      throw redirect({ to: "/login" });
    }
  },
  component: Home,
});
