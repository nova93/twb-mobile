import { theme } from "@nextui-org/react";

export default function Container({ children }: { children: JSX.Element }) {
  return (
    <div style={{ backgroundColor: theme?.colors.background.value }}>
      {children}
    </div>
  );
}
