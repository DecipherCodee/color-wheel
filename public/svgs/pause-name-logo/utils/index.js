import styles from "./style.module.scss";

const { pauseName } = styles;

export function useStore() {
  return { pauseName };
}
