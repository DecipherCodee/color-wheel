import { useStore } from "./utils";

export function useContents() {
  // const { name, GameOver } = useStore();

  // return <GameOver />;

  const {
    contents,
    colors,
    time,
    practice,
    level,
    buttons,
    mainTitle,
    buttonTitle,
    tag,
    name,
    ColorList,
    RecordList,
    onQuit,
    onRestart,
  } = useStore();

  return (
    <main className={contents}>
      <header className={mainTitle}>
        {name === "0:00" || name === "Practice" ? "Game Over" : "Paused"}
      </header>

      {tag === "level" ? (
        <aside className={level}>
          <ul className={colors}>
            <header>Color</header>

            <ColorList test={`${tag}-color-list`} />

            <button type="button" onClick={onRestart}>
              {buttonTitle}
            </button>
          </ul>

          <ul className={time}>
            <header>Time</header>
            <RecordList />

            <button type="button" onClick={onQuit}>
              Quit
            </button>
          </ul>
        </aside>
      ) : (
        <main className={practice}>
          <ul className={colors}>
            <ColorList test={`${tag}-color-list`} />
          </ul>

          <aside className={buttons}>
            <button type="button" onClick={onRestart}>
              {buttonTitle}
            </button>
            <button type="button" onClick={onQuit}>
              Quit
            </button>
          </aside>
        </main>
      )}
    </main>
  );
}
