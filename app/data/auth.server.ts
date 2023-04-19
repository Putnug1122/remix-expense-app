import { createCookieSessionStorage, json, redirect } from "@remix-run/node";
import { prisma } from "./database.server";
import * as argon2 from "argon2";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
  },
});

async function createUserSession(userId: string, redirectPath: string) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);

  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

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
  const user = await prisma.user.create({
    data: { email: email, password: passwordHash },
  });

  return createUserSession(user.id, "/expenses");
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (!existingUser) {
    const error = new Error(
      "Could not log you in, please check the provided credentials"
    );
    throw json({ message: error.message }, { status: 401 });
  }

  const correctPassword = await argon2.verify(existingUser.password, password);

  if (!correctPassword) {
    const error = new Error(
      "Could not log you in, please check the provided credentials"
    );
    throw json({ message: error.message }, { status: 401 });
  }

  return createUserSession(existingUser.id, "/expenses");
}

export async function getUserFromSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const userId = session.get("userId");

  if (!userId || typeof userId !== "string") return null;

  return userId;
}

export async function destroyUserSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function requiredUserSession(request: Request) {
  const userId = await getUserFromSession(request);

  if (!userId) {
    throw redirect("/auth?mode=login");
  }

  return userId;
}
