import { useSVGs } from "../../../../public/svgs";
import styles from "./style.module.scss";
import { useTitle } from "./title";

const { header, subHeader } = styles;

export function useStore() {
  const { useHeaderIcon, useSubHeaderIcon } = useSVGs();

  return {
    header,
    subHeader,
    Title: useTitle,
    HeaderIcon: useHeaderIcon,
    SubHeaderIcon: useSubHeaderIcon,
  };
}
