import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpensesList";
import { requiredUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";
import type { Expense } from "~/types/exprense";

export default function ExpenseLayout() {
  const expenses = useLoaderData<Expense[]>();
  const hasExpenses = expenses.length > 0;
  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding</Link> some expenses!
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export async function loader({ request }: { request: Request }) {
  const userId = await requiredUserSession(request);
  return getExpenses(userId);
}
