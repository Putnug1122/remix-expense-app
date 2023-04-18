import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
// import { getExpensesById } from "~/data/expenses.server";

export default function ExpenseDetailPage() {
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

export async function action({
  params,
  request,
}: {
  params: { id: string };
  request: Request;
}) {
  if (request.method === "PATCH") {
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
    await updateExpense(params.id, expense);
  } else if (request.method === "DELETE") {
    await deleteExpense(params.id);
  }
  return redirect("/expenses");
}
