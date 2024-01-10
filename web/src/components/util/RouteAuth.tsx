import { Navigate, Outlet } from "react-router-dom";
import { useApiStore } from "@/stores/apiStore";

export function Require() {
  const authorized = useApiStore(state => state.userId);
  return authorized ? <Outlet /> : <Navigate to="/join" replace />
}

export function Prevent() {
  const authorized = useApiStore(state => state.userId);
  return !authorized ? <Outlet /> : <Navigate to="/home" replace />
}

export * as RouteAuth from "./RouteAuth";