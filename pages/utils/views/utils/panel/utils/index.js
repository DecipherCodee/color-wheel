import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSVGs } from "../../../../../../public/svgs";
import { useTitleStore as TitleStore } from "../../../../header/utils/title/utils";
import { useLevelsStore } from "../../../../levels/utils";
import styles from "./style.module.scss";

const { panel, unlock, notes, show, lock } = styles;
const dragConstraints = { left: 0, right: 0 };
const defaultPosition = {
  xOrigin: 0,
  yOrigin: 0,
  x: 0,
  y: 0,
};
const refreshRate = 10;

function isTimeToUpdate({ counter, setCount }) {
  const value = counter + 1;
  const isToUpdate = value % refreshRate === 0;

  setCount(value);

  return isToUpdate;
}
function updatePosition({ clientX, clientY, position, setPosition }) {
  const { xOrigin, yOrigin } = position;

  setPosition({
    ...position,
    x: clientX - xOrigin,
    y: clientY - yOrigin,
  });
}
function update({ clientX, clientY, animation, position, setPosition }) {
  updatePosition({ clientX, clientY, position, setPosition });

  animation.start("tilted");
}
function onMouseLeave({ animation }) {
  animation.start("normal");
}
function onMouseEnter(
  { animation, position, setPosition },
  { clientX, clientY }
) {
  update({ clientX, clientY, animation, position, setPosition });
}
function onMouseMove(
  { counter, setCount, animation, position, setPosition },
  { clientX, clientY }
) {
  if (isTimeToUpdate({ counter, setCount })) {
    update({ clientX, clientY, animation, position, setPosition });
  }
}
function onTouchEnd({ animation }) {
  animation.start("normal");
}
function onTouchStart({ animation, position, setPosition }, { touches }) {
  const { clientX, clientY } = touches[0];
  update({ clientX, clientY, animation, position, setPosition });
}
function onTouchMove(
  { animation, position, setPosition, counter, setCount },
  { touches }
) {
  const { clientX, clientY } = touches[0];
  if (isTimeToUpdate({ counter, setCount })) {
    update({ clientX, clientY, animation, position, setPosition });
  }
}
function setOrigin({
  offsetLeft,
  offsetWidth,
  offsetTop,
  offsetHeight,
  position,
  setPosition,
}) {
  setPosition({
    ...position,
    xOrigin: offsetLeft + Math.floor(offsetWidth / 2),
    yOrigin: offsetTop + Math.floor(offsetHeight / 2),
  });
}
function useContent({ locked, difficulty, movement, number, time }) {
  return !locked ? (
    <aside className={unlock}>
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
          {` ${number} `}
          colours in
          {` ${time}`}
        </span>
      </div>
    </aside>
  ) : (
    <aside className={lock} />
  );
}

export function useStore({ animation, isShown }) {
  const [isHovered, hover] = useState(false);
  const [counter, setCount] = useState(0);
  const [position, setPosition] = useState(defaultPosition);

  const ref = useRef();
  const {
    useColorWheelLogo: ColorWheelLogo,
    useSwatchIcon: SwatchIcon,
    useLevelIcon: LevelIcon,
  } = useSVGs();
  const { initX } = useLevelsStore();

  useEffect(() => {
    const { xOrigin, yOrigin } = position;

    if ((xOrigin && yOrigin) !== 0) {
      return;
    }
    const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = ref.current;

    setOrigin({
      offsetHeight,
      offsetLeft,
      offsetTop,
      offsetWidth,
      position,
      setPosition,
    });
  }, [position]);

  useEffect(() => {
    if (isHovered) {
      ref.current.onmousemove = onMouseMove.bind(this, {
        counter,
        setCount,
        animation,
        position,
        setPosition,
      });
      ref.current.onmouseleave = onMouseLeave.bind(null, { animation });
      ref.current.onmouseenter = onMouseEnter.bind(this, {
        animation,
        position,
        setPosition,
      });
      ref.current.ontouchmove = onTouchMove.bind(this, {
        animation,
        position,
        setPosition,
        counter,
        setCount,
      });
      ref.current.ontouchend = onTouchEnd.bind(null, { animation });
      ref.current.ontouchstart = onTouchStart.bind(this, {
        animation,
        position,
        setPosition,
      });
      return;
    }
    ref.current.onmousemove = null;
    ref.current.onmouseleave = null;
    ref.current.onmouseenter = null;
    ref.current.ontouchmove = null;
    ref.current.ontouchend = null;
    ref.current.ontouchstart = null;
  }, [counter, position, animation, isHovered]);
  const { initName } = TitleStore();
  return {
    x: initX,
    Content: useContent,
    ref,
    variants: useMemo(
      () => ({
        normal: {
          rotateX: 0,
          rotateY: 0,
          originX: 0,
        },
        tilted() {
          const { y, x } = position;
          const { offsetHeight, offsetWidth } = ref.current;
          const rotateX = (y / offsetHeight / 2).toFixed(2) * 15;
          const rotateY = (x / offsetWidth / 2).toFixed(2) * 15;

          return {
            rotateX,
            rotateY,
          };
        },
        current: {
          left: "unset",
        },
        left: {
          x: 0,
          left: "-100%",
          transition: {
            type: "spring",
            damping: 16,
            mass: 0.6,
          },
        },
        right() {
          const left = initName.includes("2") ? "100%" : "76%";

          return {
            x: 0,
            left,
            transition: {
              type: "spring",
              damping: 16,
              mass: 0.6,
            },
          };
        },
      }),
      [position, initName]
    ),
    hover,
    className: useMemo(() => `${panel} ${isShown && show}`, [isShown]),
    ColorWheelLogo,
    SwatchIcon,
    LevelIcon,
    motion,
    dragConstraints,
  };
}
