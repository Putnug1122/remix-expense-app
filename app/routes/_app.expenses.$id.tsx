import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
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

// export async function loader({ params }: { params: { id: string } }) {
//   return getExpensesById(params.id);
// }
