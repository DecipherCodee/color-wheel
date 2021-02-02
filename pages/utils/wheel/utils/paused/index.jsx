import { useStore } from "./utils";

export function usePaused() {
  const {
    paused,
    PauseName,
    restart,
    restartGame,
    start,
    onClick,
    quit,
    quitGame,
  } = useStore();

  return (
    <main className={paused}>
      <PauseName />

      <aside>
        <button className={restart} type="button" onClick={restartGame}>
          Restart
        </button>
        <button className={start} type="button" onClick={onClick}>
          Continue
        </button>
      </aside>

      <button className={quit} type="button" onClick={quitGame}>
        Quit
      </button>
    </main>
  );
}
