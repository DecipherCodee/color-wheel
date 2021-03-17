import { useEffect, useMemo, useState } from "react";
import styles from "./style.module.scss";
import { useProps as useAppProps } from "../../..";
import { useProps as RightProps } from "../../right/utils";

let initShown;
let putShow;
let initMounted;
let putMount;
let initProps;
let putProps;

const defaultProps = { onClick: null };
const { left, show: showLeft } = styles;

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
function updateMounted({ isMounted, mount }) {
  if (initMounted !== isMounted) {
    initMounted = isMounted;
  }
  if (mount && putMount !== mount) {
    putMount = mount;
  }
}

function onClick({ isLeft, isRight }) {
  const { putShow: showRight } = RightProps();
  putShow(isLeft);
  showRight(isRight);
}

export function useStore() {
  const { unmount, checkMounted } = useAppProps();

  const [isShown, show] = useState(false);
  updateShown({ isShown, show });
  useEffect(() => unmount({ set: putShow }), [unmount]);
  useEffect(() => updateShown({ isShown }), [isShown]);

  const [isMounted, mount] = useState(true);
  updateMounted({ isMounted, mount });
  useEffect(() => unmount({ set: mount }), [unmount]);
  useEffect(() => updateMounted({ isMounted }), [isMounted]);

  const [props, setProps] = useState(defaultProps);
  updateProps({ props, setProps });
  useEffect(() => unmount({ set: putProps }), [unmount]);
  useEffect(() => updateProps({ props }), [props]);

  useEffect(() => checkMounted({ isMounted, put: show }), [
    isMounted,
    checkMounted,
  ]);

  return {
    onClick: props?.onClick,
    isMounted,
    className: useMemo(() => `${left} ${isShown && showLeft}`, [isShown]),
  };
}
export function useProps() {
  return {
    initShown,
    putShow,
    initMounted,
    putMount,
    initProps,
    putProps,
    onClick,
  };
}
