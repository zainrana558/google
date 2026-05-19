import { signIn } from "@/auth";

export default function SignInPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui", textAlign: "center" }}>
      <h1>Sign In</h1>
      <p>Choose your auth provider:</p>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/browse" });
        }}
      >
        <button
          type="submit"
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Sign in with Google
        </button>
      </form>
    </main>
  );
}