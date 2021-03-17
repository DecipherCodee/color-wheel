import { useStore } from "./utils";

export function useFooter() {
  const { footer, DecipherCodeLogo, Pause } = useStore();

  return (
    <main className={footer}>
      <Pause />
      <DecipherCodeLogo />
    </main>
  );
}
