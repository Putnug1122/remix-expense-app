import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Error from "~/components/util/Error";
import { requiredUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";
import type { Expense } from "~/types/exprense";

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

export async function loader({ request }: { request: Request }) {
  const userId = await requiredUserSession(request);

  const expenses = await getExpenses(userId);

  if (!expenses || expenses.length === 0) {
    throw json(
      { message: "No expenses found" },
      { status: 404, statusText: "Expenses not found" }
    );
  }

  return expenses;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <Error title={error.statusText}>
          <p>
            {error.data?.message ||
              "Something went wrong. Please try again later."}
          </p>
        </Error>
      </main>
    );
  }
}
