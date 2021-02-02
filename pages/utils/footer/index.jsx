import { useStore } from "./utils";

export function useFooter() {
  const { footer, Settings, DecipherCodeLogo, Pause } = useStore();

  return (
    <main className={footer}>
      <Pause />
      <DecipherCodeLogo />
      <Settings />
    </main>
  );
}
