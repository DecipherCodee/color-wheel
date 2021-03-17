import { useStore } from "./utils";

export function useColors() {
  const { colors, Color } = useStore();

  return Object.keys(colors).map((color) => {
    const { index, position, isFocused } = colors[color];

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
