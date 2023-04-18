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

export async function getExpenses() {
  try {
    return await prisma.expense.findMany({
      orderBy: { date: "desc" },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getExpensesById(id: string) {
  try {
    return await prisma.expense.findFirst({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateExpense(
  id: string,
  expenseData: Omit<Expense, "id">
) {
  try {
    await prisma.expense.update({
      where: { id },
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
