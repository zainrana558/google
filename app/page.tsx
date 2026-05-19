import { signIn } from "@/auth";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Welcome to luminaa2</h1>
      <p>Streaming video platform with HLS failover</p>
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
            padding: "0.5rem 1rem",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Sign in with Google
        </button>
      </form>
    </main>
  );
}