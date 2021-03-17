import { motion, motionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSVGs } from "../../../../utils/svgs";
import styles from "./style.module.scss";

const { panel, unlock, notes, hide, lock } = styles;
const dragConstraints = { left: 0, right: 0 };
const defaultPosition = {
  xOrigin: 0,
  yOrigin: 0,
  x: 0,
  y: 0,
};
export const refreshRate = 10;
const xMotionValue = motionValue(0);

export function isUpdateTime({ counter, setCount }) {
  const value = counter + 1;
  const isToUpdate = value % refreshRate === 0;

  setCount(value);

  return isToUpdate;
}
export function putPosition({ clientX, clientY }, old) {
  const { xOrigin, yOrigin } = old;
  return {
    ...old,
    x: clientX - xOrigin,
    y: clientY - yOrigin,
  };
}
export function updatePosition({ clientX, clientY, setPosition }) {
  setPosition(putPosition.bind(this, { clientX, clientY }));
}
export function update({ clientX, clientY, animation, setPosition }) {
  updatePosition({ clientX, clientY, setPosition });

  animation.start("tilted");
}

export function onMouseLeave({ animation }) {
  animation.start("normal");
}
export function onMouseEnter({ animation, setPosition }, { clientX, clientY }) {
  update({ clientX, clientY, animation, setPosition });
}
export function onMouseMove(
  { counter, setCount, animation, setPosition },
  { clientX, clientY }
) {
  if (isUpdateTime({ counter, setCount })) {
    update({ clientX, clientY, animation, setPosition });
  }
}
export function onTouchEnd({ animation }) {
  animation.start("normal");
}
export function onTouchStart({ animation, setPosition }, { touches }) {
  const { clientX, clientY } = touches[0];
  update({ clientX, clientY, animation, setPosition });
}
export function onTouchMove(
  { animation, setPosition, counter, setCount },
  { touches }
) {
  const { clientX, clientY } = touches[0];
  if (isUpdateTime({ counter, setCount })) {
    update({ clientX, clientY, animation, setPosition });
  }
}
export function onTilted({ ref, position }) {
  const { y, x } = position;
  const { offsetHeight, offsetWidth } = ref.current;
  const rotateX = (y / offsetHeight / 2).toFixed(2) * 15;
  const rotateY = (x / offsetWidth / 2).toFixed(2) * 15;

  return {
    rotateX,
    rotateY,
  };
}

export function checkHovered({
  ref,
  isHovered,
  counter,
  setCount,
  animation,
  setPosition,
}) {
  if (isHovered) {
    const { current } = ref;
    current.onmousemove = onMouseMove.bind(this, {
      counter,
      setCount,
      animation,
      setPosition,
    });
    current.onmouseleave = onMouseLeave.bind(null, { animation });
    current.onmouseenter = onMouseEnter.bind(this, {
      animation,
      setPosition,
    });
    current.ontouchmove = onTouchMove.bind(this, {
      animation,
      setPosition,
      counter,
      setCount,
    });
    current.ontouchend = onTouchEnd.bind(null, { animation });
    current.ontouchstart = onTouchStart.bind(this, {
      animation,
      setPosition,
    });
  }
}

export function useStore({ isShown, animation }) {
  const [isHovered, hover] = useState(false);
  const [counter, setCount] = useState(0);
  const [position, setPosition] = useState(defaultPosition);

  const ref = useRef();

  useEffect(() => {
    const { current = {} } = ref;
    const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = current;

    setPosition((old) => ({
      ...old,
      xOrigin: offsetLeft + Math.floor(offsetWidth / 2),
      yOrigin: offsetTop + Math.floor(offsetHeight / 2),
    }));

    checkHovered({
      ref,
      isHovered,
      counter,
      setCount,
      animation,
      setPosition,
    });

    return () => {
      current.onmousemove = null;
      current.onmouseleave = null;
      current.onmouseenter = null;
      current.ontouchmove = null;
      current.ontouchend = null;
      current.ontouchstart = null;
    };
  }, [counter, animation, isHovered]);

  const {
    useColorWheelLogo: ColorWheelLogo,
    useSwatchIcon: SwatchIcon,
    useLevelIcon: LevelIcon,
  } = useSVGs();

  return {
    LevelIcon,
    SwatchIcon,
    ColorWheelLogo,
    x: xMotionValue,
    dragConstraints,
    ref,
    motion,
    panel,
    unlock,
    notes,
    lock,
    hover: hover.bind(null, true),
    className: useMemo(() => `${panel} ${!isShown && hide}`, [isShown]),
    variants: useMemo(
      () => ({
        normal: {
          rotateX: 0,
          rotateY: 0,
          originX: 0,
        },
        tilted: onTilted.bind(null, { ref, position }),
        current: {
          left: "unset",
          transition: {
            type: "spring",
            damping: 16,
            mass: 0.6,
          },
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
        right1: {
          x: 0,
          left: "76%",
          transition: {
            type: "spring",
            damping: 16,
            mass: 0.6,
          },
        },
        right2: {
          x: 0,
          left: "100%",
          transition: {
            type: "spring",
            damping: 16,
            mass: 0.6,
          },
        },
      }),
      [position]
    ),
  };
}
