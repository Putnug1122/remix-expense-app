import { useLoaderData } from "@remix-run/react";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import { getExpenses } from "~/data/expenses.server";
import { Expense } from "~/types/exprense";

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

export default function ExpenseAnalysisPage() {
  const expenses = useLoaderData<Expense[]>();
  return (
    <main>
      <Chart expenses={dummyData} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader() {
  return getExpenses();
}
