import { useStore } from "./utils";

export function useContents() {
  const { className, onAnimationEnd, colors, Color } = useStore();

  return (
    <main className={className} onAnimationEnd={onAnimationEnd}>
      {Object.keys(colors).map((color) => {
        const { index, position, isFocused, background } = colors[color];

        return (
          <Color
            name={color}
            key={color}
            index={index}
            opacity="1"
            background={background}
            position={position}
            isFocused={isFocused}
          />
        );
      })}
    </main>
  );
}
