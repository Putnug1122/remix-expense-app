import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";
import type { Expense } from "~/types/exprense";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  const navigation = useNavigation();
  const validationError = useActionData<{ [key: string]: string }>();

  const params = useParams();
  const matches = useMatches();
  const expenses: Expense[] = matches.find(
    (match) => match.id === "routes/_app.expenses"
  )?.data;

  const expenseData = expenses.find((exp) => exp.id === params.id);

  if (params.id && !expenseData) {
    return (
      <div>
        <h1>Expense not found</h1>
        <Link to="..">Go back</Link>
      </div>
    );
  }
  const isSubmitting = navigation.state !== "idle";

  const defaultValue = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date.slice(0, 10),
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  return (
    <Form
      method={expenseData ? "PATCH" : "POST"}
      className="form"
      id="expense-form"
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValue.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            defaultValue={defaultValue.amount}
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={defaultValue.date ?? ""}
          />
        </p>
      </div>
      {validationError && (
        <ul>
          {Object.entries(validationError).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
