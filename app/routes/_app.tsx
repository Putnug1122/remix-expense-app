import { Outlet } from "@remix-run/react";
import expensesStyle from "~/styles/exprenses.css";

export default function ExpenseAppLayout() {
  return <Outlet />;
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyle }];
}
