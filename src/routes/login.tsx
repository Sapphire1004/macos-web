import { createFileRoute, redirect } from "@tanstack/react-router";
import { readAuthState } from "../contexts/auth";
import { LockScreen } from "../pages/LockScreen";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    if (readAuthState().status === "authenticated") {
      throw redirect({ to: "/" });
    }
  },
  component: LockScreen,
});
