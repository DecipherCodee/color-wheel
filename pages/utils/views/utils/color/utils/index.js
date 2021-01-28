import { useMemo } from "react";
import styles from "./style.module.scss";

const { color, focus } = styles;

export function useStore({
  position: { top, left, right, bottom },
  index,
  background,
  isFocused,
  name,
}) {
  return {
    className: useMemo(() => `${name} ${color} ${isFocused && focus}`, [
      name,
      isFocused,
    ]),
    style: useMemo(
      () => ({
        background,
        top,
        left,
        right,
        bottom,
        zIndex: index,
      }),
      [background, bottom, index, left, right, top]
    ),
  };
}
