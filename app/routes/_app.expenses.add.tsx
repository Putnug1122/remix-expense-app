import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";

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
  const formData = await request.formData();
  const expense = {
    title: formData.get("title") as string,
    amount: formData.get("amount") as unknown as number,
    date: formData.get("date") as string,
  };
  await addExpense(expense);
  return redirect("/expenses");
}
