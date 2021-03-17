import { useEffect, useState } from "react";
import { useProps as titleProps } from "../../../../layout/header/utils/title/utils";
import { useLists } from "./tools";
import {
  contents,
  colors,
  time,
  practice,
  level,
  mainTitle,
  buttons,
} from "./style.module.scss";

let initRestart;
function putRestart({ onRestart }) {
  if (initRestart === onRestart) {
    return null;
  }
  initRestart = onRestart;
  return undefined;
}
let initQuit;
function putQuit({ onQuit }) {
  if (initQuit === onQuit) {
    return null;
  }
  initQuit = onQuit;
  return undefined;
}
let initAllUnfocused;
function putAllUnfocused({ onAllFocused }) {
  if (initAllUnfocused === onAllFocused) {
    return null;
  }
  initAllUnfocused = onAllFocused;
  return undefined;
}
let initTag = "level";
function putTag({ tag }) {
  if (initTag === tag) {
    return null;
  }
  initTag = tag;
  return undefined;
}

export function checkAllUnfocused({ setButtonTitle }) {
  const { initName } = titleProps();

  if (initAllUnfocused() && initName !== "Practice") {
    setButtonTitle("Try again");
    return;
  }
  setButtonTitle("Restart");
}

export function useStore() {
  const [buttonTitle, setButtonTitle] = useState("Restart");

  const { initName } = titleProps();

  useEffect(() => checkAllUnfocused({ setButtonTitle }), []);

  const { useColorList, useRecordList } = useLists();

  return {
    contents,
    colors,
    buttons,
    time,
    practice,
    level,
    mainTitle,
    buttonTitle,
    tag: initTag,
    name: initName,
    ColorList: useColorList,
    RecordList: useRecordList,
    onQuit: initQuit,
    onRestart: initRestart,
  };
}
export function useProps() {
  return {
    initRestart,
    putRestart,
    initQuit,
    putQuit,
    initAllUnfocused,
    putAllUnfocused,
    initTag,
    putTag,
  };
}
