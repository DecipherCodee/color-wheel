import { useEffect, useMemo, useState } from "react";
import styles from "./style.module.scss";

let thisDragging;
let putDragging;

let thisXOrigin;
let putXOrigin;

let thisYOrigin;
let putYOrigin;

let thisXTranslation;
let putXTranslation;

let thisYTranslation;
let putYTranslation;

let thisLastXTranslation;
let putLastXTranslation;

let thisLastYTranslation;
let putLastYTranslation;

function mouseDown({ clientX, clientY }) {
  putDragging(true);
  putXOrigin(clientX);
  putYOrigin(clientY);
}
function mouseUp() {
  // putXOrigin(0);
  // putYOrigin(0);
  // putLastXTranslation(thisXTranslation);
  // putLastYTranslation(thisYTranslation);
  putDragging(false);
}
function mouseMove({ clientX, clientY }) {
  putXTranslation(clientX - thisXOrigin);
  putYTranslation(clientY - thisYOrigin);

  // console.log(thisXTranslation, thisYTranslation);
}
function init({
  isDragging,
  setDraging,
  xOrigin,
  setXOrigin,
  yOrigin,
  setYOrigin,
  xTranslation,
  setXTranslation,
  yTranslation,
  setYTranslation,
  lastXTranslation,
  setLastXTranslation,
  lastYTranslation,
  setLastYTranslation,
}) {
  thisDragging = isDragging;
  putDragging = setDraging;

  thisXOrigin = xOrigin;
  putXOrigin = setXOrigin;

  thisYOrigin = yOrigin;
  putYOrigin = setYOrigin;

  thisXTranslation = xTranslation;
  putXTranslation = setXTranslation;

  thisYTranslation = yTranslation;
  putYTranslation = setYTranslation;

  thisLastXTranslation = lastXTranslation;
  putLastXTranslation = setLastXTranslation;

  thisLastYTranslation = lastYTranslation;
  putLastYTranslation = setLastYTranslation;
}
function update({
  isDragging,
  xOrigin,
  yOrigin,
  xTranslation,
  yTranslation,
  lastXTranslation,
  lastYTranslation,
}) {
  thisDragging = isDragging;

  thisXOrigin = xOrigin;
  thisYOrigin = yOrigin;

  thisXTranslation = xTranslation;
  thisYTranslation = yTranslation;

  thisLastXTranslation = lastXTranslation;
  thisLastYTranslation = lastYTranslation;
}

function useWheel() {
  console.log(thisXOrigin, thisYOrigin);
  const [isDragging, setDraging] = useState(false);
  const [xOrigin, setXOrigin] = useState(0);
  const [yOrigin, setYOrigin] = useState(0);
  const [xTranslation, setXTranslation] = useState(0);
  const [yTranslation, setYTranslation] = useState(0);
  const [lastXTranslation, setLastXTranslation] = useState(0);
  const [lastYTranslation, setLastYTranslation] = useState(0);
  const dragStyles = useMemo(
    () => ({
      transform: `translate(${xTranslation}px, ${yTranslation}px)`,
      transition: !isDragging && "transform 500ms",
      zIndex: isDragging && "2",
      cursor: isDragging && "grabbing",
      // top: isDragging && `${yTranslation}px`,
      // left: isDragging && `${xTranslation}px`,
    }),
    [xTranslation, yTranslation, isDragging]
  );

  init({
    isDragging,
    setDraging,
    xOrigin,
    setXOrigin,
    yOrigin,
    setYOrigin,
    xTranslation,
    setXTranslation,
    yTranslation,
    setYTranslation,
    lastXTranslation,
    setLastXTranslation,
    lastYTranslation,
    setLastYTranslation,
  });

  useEffect(
    () =>
      update({
        isDragging,
        xOrigin,
        yOrigin,
        xTranslation,
        yTranslation,
        lastXTranslation,
        lastYTranslation,
      }),
    [
      isDragging,
      xOrigin,
      yOrigin,
      xTranslation,
      yTranslation,
      lastXTranslation,
      lastYTranslation,
    ]
  );
  useEffect(() => {
    if (thisDragging) {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
    } else {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);

      // putYTranslation(0);
      // putXTranslation(0);
    }
  });

  return (
    <svg
      onMouseDown={mouseDown}
      className={`${styles.box} ${isDragging && "isDragging"}`}
      style={dragStyles}
      viewBox="0 0 146 159"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path
          id="path"
          d="m67 3h12c33.137085 0 60 26.862915 60 60v25c0 33.137085-26.862915 60-60 60h-72v-85c0-33.137085 26.862915-60 60-60z"
        />
        <filter id="shadow" height="117.2%" width="118.9%" x="-9.5%" y="-5.9%">
          <feMorphology
            in="SourceAlpha"
            operator="erode"
            radius="1.5"
            result="shadowSpreadOuter1"
          />
          <feOffset
            dx={0}
            dy={4}
            in="shadowSpreadOuter1"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation={5}
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            type="matrix"
            values="0 0 0 0 0.109803922 0 0 0 0 0.101960784 0 0 0 0 0.0941176471 0 0 0 1 0"
          />
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd">
        <use fill="#000" filter="url(#shadow)" xlinkHref="#path" />
        <use fillRule="evenodd" xlinkHref="#path" />
      </g>
    </svg>
  );
}

export const useStore = () => {
  return {
    Wheel: useWheel,
    styles,
  };
};
