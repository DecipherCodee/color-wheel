import { useEffect, useMemo, useState } from "react";
import { useProps as useAppProps } from "../../../utils";
import { useProps as pauseProps } from "../../../utils/layout/footer/utils/pause/utils";
import { useProps as ColorsProps } from "./colors/utils";
import { level1, show as show1 } from "./style.module.scss";

let initShown;
let putShow;
let initProps;
let putProps;

const defaultProps = { onTransitionEnd: null };

export function onClick() {
  const { initPaused, onClick: clickPause } = pauseProps();

  if (initPaused) {
    clickPause();
  }
}

function updateShown({ isShown, show }) {
  if (initShown !== isShown) {
    initShown = isShown;
  }
  if (show && putShow !== show) {
    putShow = show;
  }
}
function updateProps({ props, setProps }) {
  if (initProps !== props) {
    initProps = props;
  }
  if (setProps && putProps !== setProps) {
    putProps = setProps;
  }
}

export function useStore() {
  const { unmount } = useAppProps();

  const [isShown, show] = useState(true);
  updateShown({ isShown, show });
  useEffect(() => unmount({ set: putShow }), [unmount]);
  useEffect(() => updateShown({ isShown }), [isShown]);

  const [props, setProps] = useState(defaultProps);
  updateProps({ props, setProps });
  useEffect(() => unmount({ set: setProps }), [unmount]);
  useEffect(() => updateProps({ props }), [props]);

  const { useColors } = ColorsProps();

  return {
    Colors: useColors,
    onClick,
    onTransitionEnd: props?.onTransitionEnd,
    className: useMemo(() => `${level1} ${isShown && show1}`, [isShown]),
  };
}
export function useProps() {
  return {
    initShown,
    putShow,
    initProps,
    putProps,
  };
}
