import { useStore } from "./utils";

export function useFooter() {
  const { footer, settings, Settings, DecipherCodeLogo, Pause } = useStore();

  return (
    <main className={footer}>
      <Pause />

      <DecipherCodeLogo />

      {false && (
        <div className={settings}>
          <Settings />
        </div>
      )}
    </main>
  );
}
