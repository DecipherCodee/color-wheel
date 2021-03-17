import { useStore } from "./utils";

export function useWheel() {
  const {
    ref,
    motion,
    variants,
    className,
    animation,
    transition,
    isFlipped,
    isDragged,
    Contents,
    onDrag,
    onDragStart,
    onDragEnd,
  } = useStore();

  return (
    <motion.main
      className={className}
      drag={isDragged}
      dragElastic={1}
      dragConstraints={ref}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      variants={variants}
      initial="normal"
      animate={animation}
      transition={transition}
    >
      {isFlipped && <Contents />}
    </motion.main>
  );
}
