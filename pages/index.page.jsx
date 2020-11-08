import {
  createRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useStore } from "./utils";

export const useHome = () => {
  const { styles, Wheel } = useStore();
  const [isDragging, drag] = useState(false);
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [xTranslate, setXTranslate] = useState();
  const [yTranslate, setYTranslate] = useState();
  const [isHidden, hide] = useState(false);
  const [background, setBackground] = useState("blue");

  const ref = useRef();

  const dragStyles = useMemo(
    () => ({
      cursor: isDragging ? "grabbing" : "grab",
      left: x ? `${x}px` : "unset",
      top: y ? `${y}px` : "unset",
    }),
    [isDragging, x, y]
  );

  const moveAt = useCallback(
    (pageX, pageY) => {
      const newX = pageX - xTranslate;
      const newY = pageY - yTranslate;

      setX(newX);
      setY(newY);
    },
    [xTranslate, yTranslate]
  );
  const setPosition = useCallback(
    (clientX, clientY, pageX, pageY) => {
      setXTranslate(clientX - ref.current.getBoundingClientRect().left);
      setYTranslate(clientY - ref.current.getBoundingClientRect().top);

      drag(true);
      moveAt(pageX, pageY);
    },
    [moveAt]
  );
  const findClosestElement = useCallback(
    (pageX, pageY, clientX, clientY) => {
      moveAt(pageX, pageY);
      hide(true);

      const nearestElement = document.elementFromPoint(clientX, clientY);
      hide(false);

      if (!nearestElement) {
        return;
      }
      const droppable = nearestElement.closest(".blue-box");

      if (droppable) {
        setBackground("pink");
      } else {
        setBackground("blue");
      }
    },
    [moveAt]
  );

  const mouseDown = useCallback(
    (event) => {
      const { clientY, clientX, pageX, pageY } = event;

      setPosition(clientX, clientY, pageX, pageY);
    },
    [setPosition]
  );
  const mouseMove = useCallback(
    (event) => {
      const { pageX, pageY, clientX, clientY } = event;

      findClosestElement(pageX, pageY, clientX, clientY);
    },
    [findClosestElement]
  );
  const mouseUp = useCallback(() => drag(false), []);

  const touchStart = useCallback(
    (event) => {
      const { touches } = event;
      const { clientX, clientY, pageX, pageY } = touches[0];

      setPosition(clientX, clientY, pageX, pageY);
    },
    [setPosition]
  );
  const touchMove = useCallback(
    (event) => {
      const { touches } = event;
      const { pageX, pageY, clientX, clientY } = touches[0];

      findClosestElement(pageX, pageY, clientX, clientY);
    },
    [findClosestElement]
  );

  useLayoutEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("touchmove", touchMove);
      return;
    }
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("touchmove", touchMove);
  }, [mouseDown, mouseMove, touchMove, isDragging]);

  return (
    <main className={styles.home}>
      <header className={styles.title}>Color wheel</header>

      {/* <Wheel /> */}
      <div
        className="blue-box"
        style={{ height: "20rem", width: "20rem", background }}
      />
      <div
        hidden={isHidden}
        className="moving-red-box"
        aria-hidden="true"
        onTouchStart={touchStart}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onTouchEnd={mouseUp}
        ref={ref}
        style={{
          height: "10rem",
          width: "10rem",
          background: "red",
          position: "absolute",
          bottom: 0,
          ...dragStyles,
        }}
      />
    </main>
  );
};

export default useHome;
