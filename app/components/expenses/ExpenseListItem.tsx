import { Form, Link } from "@remix-run/react";
import type { Expense } from "~/types/exprense";

function ExpenseListItem({ id, title, amount }: Omit<Expense, "date">) {
  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <Form method="delete" action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
