import { useStore } from "./utils";

export function useColorList() {
  const { list, colors } = useStore();

  return Object.keys(colors).map((color) => (
    <li className={list} key={color}>
      {color}
    </li>
  ));
}
