import { useStore } from "./utils";

export function usePanel({
  isShown,
  swatches: { swatch1, swatch2 },
  difficulty,
  movement,
  guide,
  animation,
  left,
  onTap,
  onAnimationEnd,
  onDrag,
  onDragEnd,
  onAnimationComplete,
}) {
  const {
    x,
    className,
    unlock,
    notes,
    lock,
    motion,
    ref,
    dragConstraints,
    variants,
    hover,
    LevelIcon,
    SwatchIcon,
    ColorWheelLogo,
  } = useStore({ isShown, animation });

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
      onClick={onTap}
      onMouseEnter={hover}
      onTouchStart={hover}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onAnimationEnd={onAnimationEnd}
      onAnimationComplete={onAnimationComplete}
    >
      <LevelIcon />

      <SwatchIcon attributes={swatch1} />
      <SwatchIcon attributes={swatch2} />

      {difficulty ? (
        <aside className={unlock} test="unlock">
          <div className={notes}>
            <p>Difficulty:</p>
            <span>{difficulty}</span>
          </div>
          <div className={notes}>
            <p>Movement:</p>
            <span>{movement}</span>
          </div>
          <div className={notes}>
            <p>Guide:</p>
            <span>
              Find
              {` ${guide?.number} `}
              colours in
              {` ${guide?.time}`}
            </span>
          </div>
        </aside>
      ) : (
        <aside className={lock} test="lock" />
      )}

      <ColorWheelLogo />
    </motion.main>
  );
}
