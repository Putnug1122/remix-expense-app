import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { requiredUserSession } from "~/data/auth.server";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function ExpenseAddPage() {
  const navigate = useNavigate();
  const closeHandler = () => {
    navigate("..");
  };
  return (
    <>
      <Modal onClose={closeHandler}>
        <ExpenseForm />
      </Modal>
    </>
  );
}

export async function action({ request }: { request: Request }) {
  const userId = await requiredUserSession(request);
  const formData = await request.formData();

  const expense = {
    title: formData.get("title") as string,
    amount: formData.get("amount") as unknown as number,
    date: formData.get("date") as string,
  };
  try {
    validateExpenseInput(expense);
  } catch (error) {
    return error;
  }

  await addExpense(expense, userId);
  return redirect("/expenses");
}
