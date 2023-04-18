import type { Expense } from "~/types/exprense";
import { prisma } from "./database.server";

export async function addExpense(expenseData: Omit<Expense, "id">) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
