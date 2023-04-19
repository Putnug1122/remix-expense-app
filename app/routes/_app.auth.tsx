import AuthForm from "~/components/auth/AuthForm";
import { login, signup } from "~/data/auth.server";
import { validateCredentials } from "~/data/validation.server";
import authStyles from "~/styles/auth.css";

export default function AuthPage() {
  return (
    <>
      <AuthForm />
    </>
  );
}

export async function action({ request }: { request: Request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    validateCredentials(email, password);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === "login") {
      return await login({ email, password });
    } else {
      return await signup({ email, password });
    }
  } catch (error) {
    return error;
  }
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}
