import { useStore } from "./utils";

export function useWheel() {
  const {
    className,
    motion,
    animate,
    variants,
    ref,
    onDragStart,
    onDrag,
    onDragEnd,
    isDragged,
    Contents,
    transition,
    initName,
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
      animate={animate}
      transition={transition}
    >
      <Contents name={initName} />
    </motion.main>
  );
}
