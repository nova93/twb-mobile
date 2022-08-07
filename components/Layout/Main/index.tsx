export default function Container({ children }: { children: JSX.Element }) {
  return (
    <main
      style={{
        height: "calc(100vh - 0.5rem)",
        margin: "0.25rem",
        overflow: "auto",
        paddingBottom: "calc(2rem + 40px)",
      }}
    >
      {children}
    </main>
  );
}
