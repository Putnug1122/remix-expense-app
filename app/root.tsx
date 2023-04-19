import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
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

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <Document title={caught.statusText}>
      <main>
        <Error title={caught.statusText}>
          <p>
            {caught.data?.message ||
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

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="An error occurred">
      <main>
        <Error title="An error occurred">
          <p>
            {error.message || "Something went wrong. Please try again later."}
          </p>
          <p>
            Back to <Link to="/">safety</Link>
          </p>
        </Error>
      </main>
    </Document>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}
