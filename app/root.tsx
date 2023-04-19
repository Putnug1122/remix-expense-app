import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import sharedStyles from "~/styles/shared.css";
import Error from "~/components/util/Error";

interface DocumentProps {
  title?: string;
  children: React.ReactNode;
}

function Document({ title, children }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={`${error.status}`}>
        <main>
          <Error title={`${error.status}`}>
            <p>
              {error.data?.message ||
                "Something went wrong. Please try again later."}
            </p>
            <p>
              Back to <Link to="/">safety</Link>
            </p>
          </Error>
        </main>
      </Document>
    );
  }

  let errorMessage = "Unknown error";
  if (isDefinitelyAnError(error)) {
    errorMessage = error.message;
  }

  return (
    <Document title="Error">
      <main>
        <Error title="Error">
          <p>{errorMessage}</p>
          <p>
            Back to <Link to="/">safety</Link>
          </p>
        </Error>
      </main>
    </Document>
  );
}

function isDefinitelyAnError(error: unknown): error is Error {
  return error instanceof Error;
}

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}
