export default function Container({ children }: { children: JSX.Element }) {
  return (
    <main
      style={{ minHeight: "calc(100vh - 40px - 2.25rem)", margin: "0.25rem" }}
    >
      {children}
    </main>
  );
}
