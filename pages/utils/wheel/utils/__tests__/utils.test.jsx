import { shallow } from "enzyme";
import {
  useStore,
  updateDragged,
  useWheelStore,
  updateQuitted,
  updateFlipped,
  updateResized,
  updateProps,
  updateAllFocused,
  onFlip,
  variants,
  defaultProps,
} from "..";

describe("useStore", () => {
  it("returns an object", () => {
    function Store() {
      return useStore();
    }
    const wrapper = shallow(<Store />);
    expect(wrapper).toHaveLength(1);
  });

  describe("update", () => {
    test("isDragged", () => {
      const isDragged = false;
      updateDragged({ isDragged });
      const { initDragged } = useWheelStore();
      expect(initDragged).toEqual(isDragged);
    });
    test("isQuitted", () => {
      const isQuitted = false;
      updateQuitted({ isQuitted });
      const { initQuitted } = useWheelStore();
      expect(initQuitted).toEqual(isQuitted);
    });
    test("isResized", () => {
      const isResized = false;
      updateResized({ isResized });
      const { initResized } = useWheelStore();
      expect(initResized).toEqual(isResized);
    });
    test("isFlipped", () => {
      const isFlipped = false;
      updateFlipped({ isFlipped });
      const { initFlipped } = useWheelStore();
      expect(initFlipped).toEqual(isFlipped);
    });
    test("isAllFocused", () => {
      const isAllFocused = false;
      updateAllFocused({ isAllFocused });
      const { initAllFocused } = useWheelStore();
      expect(initAllFocused).toEqual(isAllFocused);
    });
    test("props", () => {
      const { initProps } = useWheelStore();
      updateProps({ props: defaultProps });
      expect(initProps).toEqual(defaultProps);
    });
  });

  describe("onFlip", () => {
    test("calls onFocusAll if isFlipped", () => {
      const isFlipped = true;
      const onFocusAll = jest.fn();
      onFlip({ isFlipped, onFocusAll });
      expect(onFocusAll).toHaveBeenCalledTimes(1);
    });
    test("calls nothing if isFlipped = false", () => {
      const isFlipped = false;
      const onFocusAll = jest.fn();
      onFlip({ isFlipped, onFocusAll });
      expect(onFocusAll).toHaveBeenCalledTimes(0);
    });
  });

  describe("defaultProps", () => {
    test("onContent returns an object", () => {
      const { onContent } = defaultProps;
      const result = onContent();
      expect(typeof result === "object").toBeTruthy();
    });
  });

  describe("variants", () => {
    test("flipped", () => {
      const { flipped } = variants;
      const result = flipped();

      expect(typeof result === "object").toBeTruthy();
    });
  });
});
