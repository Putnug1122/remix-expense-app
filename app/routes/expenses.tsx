import { Outlet } from "@remix-run/react";

export default function ExpenseLayout() {
  return (
    <main>
      <p>Shared element</p>
      <Outlet />
    </main>
  );
}
