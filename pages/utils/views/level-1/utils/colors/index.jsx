import { useStore } from "./utils";

export function useColours() {
  const { initColours, Color } = useStore();

  return Object.keys(initColours).map((color) => {
    const { index, position, isFocused } = initColours[color];

    return (
      <Color
        name={color}
        key={color}
        index={index}
        background={color}
        position={position}
        isFocused={isFocused}
      />
    );
  });
}
