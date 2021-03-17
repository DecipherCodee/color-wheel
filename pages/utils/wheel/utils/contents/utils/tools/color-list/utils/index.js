import styles from "./style.module.scss";

let initColors;
function putColors({ colors }) {
  if (initColors === colors) {
    return null;
  }
  initColors = colors;
  return undefined;
}

const { list } = styles;

export function useStore() {
  return { list, colors: initColors };
}
export function useProps() {
  return {
    initColors,
    putColors,
  };
}
