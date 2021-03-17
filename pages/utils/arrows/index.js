import dynamic from "next/dynamic";
import { useProps as titleProps } from "../layout/header/utils/title/utils";

const useLeft = dynamic(() => import("./left").then((mod) => mod.useLeft));

const useRight = dynamic(() => import("./right").then((mod) => mod.useRight));

export function onArrows({
  thisView,
  nextView,
  animate,
  animateTo,
  position,
  positionTo,
  mount,
  unmount,
  title,
}) {
  position({ left: positionTo });

  if (mount) {
    mount(true);
  }
  const { updateTitle, putShow: showTitle } = titleProps();

  showTitle(false);
  setTimeout(updateTitle.bind(null, { name: title }), 600);

  thisView(false);

  if (nextView) {
    nextView(true);
  }
  animate(animateTo);

  if (unmount) {
    unmount(false);
  }
}
export function onPress({
  onClick,
  thisView,
  nextView,
  animate,
  animateTo,
  mount,
  unmount,
  isLeft,
  isRight,
  title,
  position,
  positionTo,
}) {
  onArrows({
    thisView,
    nextView,
    animate,
    animateTo,
    position,
    positionTo,
    mount,
    unmount,
    title,
  });
  onClick({
    isLeft,
    isRight,
  });
}

export function putOnClick({ onClick }, old) {
  return { ...old, onClick };
}
function putArrows({
  putProps,
  onClick,
  thisView,
  nextView,
  animate,
  animateTo,
  mount,
  unmount,
  isLeft,
  isRight,
  title,
  position,
  positionTo,
}) {
  if (!putProps) {
    return;
  }
  putProps(
    putOnClick.bind(this, {
      onClick: onPress.bind(null, {
        onClick,
        thisView,
        nextView,
        animate,
        animateTo,
        mount,
        unmount,
        isLeft,
        isRight,
        title,
        position,
        positionTo,
      }),
    })
  );
}

export function useArrows() {
  return { useLeft, useRight, putArrows };
}
