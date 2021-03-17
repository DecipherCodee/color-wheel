import { useStore } from "./utils";

export function useHeader() {
  const { header, subHeader, Title, HeaderIcon, SubHeaderIcon } = useStore();

  return (
    <main className={header}>
      <HeaderIcon />

      <header className={subHeader}>
        <SubHeaderIcon />
      </header>

      <Title />
    </main>
  );
}
