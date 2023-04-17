import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";

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
  return (
    <main>
      <Chart expenses={dummyData} />
      <ExpenseStatistics expenses={dummyData} />
    </main>
  );
}
