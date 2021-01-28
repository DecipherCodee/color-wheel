import { useEffect, useState } from "react";
import { motionValue } from "framer-motion";
import dynamic from "next/dynamic";
import { useGStore as GStore } from "../..";
import { useLeft as Left } from "./left";
import { useRight as Right } from "./right";

let initShown;
let putShow = () => {};
let initPractice;
let putPractice = () => {};
let initX;

const Level1Panel = dynamic(() =>
  import("../../views/level-1/utils/panel").then((mod) => mod.usePanel)
);
const Level2Panel = dynamic(
  () => import("../../views/level-2/utils/panel").then((mod) => mod.usePanel),
  { ssr: false }
);
const Practice = dynamic(
  () => import("./practice").then((mod) => mod.usePractice),
  { ssr: false }
);

function useRender() {
  return (
    <>
      <Left />
      <Level1Panel />
      <Level2Panel />
      <Practice />
      <Right />
    </>
  );
}

export function useStore() {
  const { unmount } = GStore();

  const [isPractice, setPractice] = useState(false);
  initPractice = isPractice;
  putPractice = setPractice;
  useEffect(() => putPractice(false), []);
  useEffect(() => {
    initPractice = isPractice;
  }, [isPractice]);

  const [isShown, show] = useState(true);
  initShown = isShown;
  putShow = show;
  useEffect(() => unmount({ set: show, value: true }), [unmount]);
  useEffect(() => {
    initShown = isShown;
  }, [isShown]);

  const x = motionValue(0);
  initX = x;
  useEffect(() => {
    initX = x;
  }, [x]);

  return {
    Render: useRender,
  };
}
export function useLevelsStore() {
  return {
    initShown,
    putShow,
    initPractice,
    putPractice,
    initX,
  };
}
