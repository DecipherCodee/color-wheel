import { useStore } from "./utils";

export function useHome() {
  const {
    Left,
    Right,
    Panel1,
    Panel2,
    Practice,
    className,
    onAnimationEnd,
  } = useStore();

  return (
    <main className={className} onAnimationEnd={onAnimationEnd}>
      <Left />
      <Practice />
      <Panel1 />
      <Panel2 />
      <Right />
    </main>
  );
}

export default useHome;
