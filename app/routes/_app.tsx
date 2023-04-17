import { Outlet } from "@remix-run/react";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import expensesStyle from "~/styles/exprenses.css";

export default function ExpenseAppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />;
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyle }];
}
