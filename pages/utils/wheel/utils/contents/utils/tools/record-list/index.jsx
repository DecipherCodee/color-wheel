import { useStore } from "./utils";

export function useRecordList() {
  const { list, colors } = useStore();

  return Object.keys(colors).map((color) => {
    const { record } = colors[color];

    return (
      <li className={list} key={color + record}>
        {!record ? "—" : record}
      </li>
    );
  });
}
