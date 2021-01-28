import { useStore } from "./utils";

export function usePanel({
  isShown,
  swatch1,
  swatch2,
  difficulty,
  movement,
  guide,
  locked,
  onTransitionEnd,
  animation,
  left,
  onDrag,
  onDragEnd,
}) {
  const {
    x,
    ref,
    hover,
    LevelIcon,
    SwatchIcon,
    ColorWheelLogo,
    motion,
    dragConstraints,
    className,
    variants,
    Content,
  } = useStore({ animation, isShown });

  return (
    <motion.main
      className={className}
      ref={ref}
      style={{ x, left }}
      variants={variants}
      initial="normal"
      animate={animation}
      drag="x"
      dragConstraints={dragConstraints}
      dragElastic={1}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onTransitionEnd={onTransitionEnd}
      onMouseEnter={hover.bind(null, true)}
      onMouseLeave={hover.bind(null, false)}
      onTouchStart={hover.bind(null, true)}
      onTouchEnd={hover.bind(null, false)}
    >
      <LevelIcon />

      <SwatchIcon attributes={swatch1} />
      <SwatchIcon attributes={swatch2} />

      <Content
        locked={locked}
        movement={movement}
        number={guide?.number}
        time={guide?.time}
        difficulty={difficulty}
      />

      <ColorWheelLogo />
    </motion.main>
  );
}
