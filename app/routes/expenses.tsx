import { Outlet } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
import expensesStyles from "~/styles/exprenses.css";

const dummyData = [
  {
    id: "1",
    title: "New TV",
    amount: 799.99,
    date: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date().toISOString(),
  },
];

export default function ExpenseLayout() {
  return (
    <>
      <main>
        <Outlet />
        <ExpensesList expenses={dummyData} />
      </main>
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
