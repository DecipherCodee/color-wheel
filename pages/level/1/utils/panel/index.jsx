import { useStore } from "./utils";

export function usePanel() {
  const {
    Panel,
    isShown,
    isMounted,
    guide,
    swatch1,
    swatch2,
    animation,
    left,
    onAnimationEnd,
    onAnimationComplete,
    onTap,
    onDrag,
    onDragEnd,
  } = useStore();

  return (
    isMounted && (
      <Panel
        left={left}
        isShown={isShown}
        guide={guide}
        swatches={{ swatch1, swatch2 }}
        difficulty="Hard"
        movement="Free"
        animation={animation}
        onAnimationEnd={onAnimationEnd}
        onAnimationComplete={onAnimationComplete}
        onTap={onTap}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
      />
    )
  );
}
