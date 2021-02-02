import { useStore } from "./utils";

export function useGameOver() {
  const {
    gameOver,
    GameOver,
    table,
    colors,
    ColorList,
    RecordList,
    restartGame,
    initAllFocused,
    time,
    quitGame,
  } = useStore();

  return (
    <main className={gameOver}>
      <GameOver />

      <aside className={table}>
        <ul className={colors}>
          <header>Color</header>

          <ColorList />

          <button type="button" onClick={restartGame}>
            {initAllFocused ? "Restart" : "Try again"}
          </button>
        </ul>

        <ul className={time}>
          <header>Time</header>
          <RecordList />

          <button type="button" onClick={quitGame}>
            Quit
          </button>
        </ul>
      </aside>
    </main>
  );
}
