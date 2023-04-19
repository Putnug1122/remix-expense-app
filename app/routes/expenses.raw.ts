import { requiredUserSession } from "~/data/auth.server";

export async function loader({ request }: { request: Request }) {
  await requiredUserSession(request);
  return [
    {
      id: 1,
      title: "New TV",
      amount: 799.99,
      date: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Car Insurance",
      amount: 294.67,
      date: new Date().toISOString(),
    },
  ];
}
