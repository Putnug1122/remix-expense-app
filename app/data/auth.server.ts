import { json } from "@remix-run/node";
import { prisma } from "./database.server";
import * as argon2 from "argon2";

export async function signup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    const error = new Error("A user with the provided email already exists!");
    throw json({ message: error.message }, { status: 422 });
  }

  const passwordHash = await argon2.hash(password);
  await prisma.user.create({
    data: { email: email, password: passwordHash },
  });
}
