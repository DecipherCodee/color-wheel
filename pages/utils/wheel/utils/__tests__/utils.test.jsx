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
  onDragStart,
  isView,
  onDragEnd,
  resizeWheel,
  isTitle,
  useContents,
  GameOver,
  Paused,
  isWidth,
  isContent,
  useClassName,
} from "..";

describe("useStore", () => {
  it("returns an object", () => {
    function Store() {
      return useStore();
    }
    const wrapper = shallow(<Store />);
    expect(wrapper).toHaveLength(1);
  });

  describe("useClassName", () => {
    test("returns a string if isResized && isFlipped == true", () => {
      const result = useClassName({ isResized: true, isFlipped: true });
      expect(typeof result).toEqual("string");
    });
  });

  describe("dynamic", () => {
    describe("GameOver", () => {
      it("renders", () => {
        const wrapper = shallow(<GameOver />);
        expect(wrapper).toHaveLength(1);
      });
    });
    describe("Paused", () => {
      it("renders", () => {
        const wrapper = shallow(<Paused />);
        expect(wrapper).toHaveLength(1);
      });
    });
  });

  describe("useContents", () => {
    it("renders if isFlipped = true", () => {
      const { putFlip } = useWheelStore();
      putFlip(true);
      function Contents() {
        return useContents({});
      }
      const wrapper = shallow(<Contents />);
      expect(wrapper).toHaveLength(1);
    });

    describe("isContent", () => {
      test("returns null if isFlipped = false", () => {
        const content = isContent({});

        expect(content).toBeNull();
      });
      test("returns 'game-over' if name = 'Practice'", () => {
        const content = isContent({ isFlipped: true, name: "Practice" });
        const {
          props: { test },
        } = content;
        expect(test).toEqual("game-over");
      });
      test("returns 'paused' if name != 'Pratice'", () => {
        const content = isContent({ isFlipped: true });
        const {
          props: { test },
        } = content;
        expect(test).toEqual("paused");
      });
    });
  });

  describe("quitGame", () => {
    const { quitGame } = useWheelStore();

    describe("isTitle", () => {
      test("returns initial value if value = false", () => {
        const result = isTitle(false);
        expect(result).toEqual(false);
      });
      test("returns false if value = true", () => {
        const result = isTitle(true);
        expect(result).toEqual(false);
      });
    });

    test("calls initProps.onRestartLevel", () => {
      const { initProps } = useWheelStore();
      initProps.onRestartLevel = jest.fn();
      quitGame();
      expect(initProps.onRestartLevel).toHaveBeenCalledTimes(1);
    });
    test("sets isQuitted = true", () => {
      quitGame();
      const { initQuitted } = useWheelStore();
      expect(initQuitted).toEqual(true);
    });
    test("sets isDragged = true", () => {
      quitGame();
      const { initDragged } = useWheelStore();
      expect(initDragged).toEqual(true);
    });
  });

  describe("restartGame", () => {
    const { restartGame } = useWheelStore();
    const showTitle = jest.fn();
    const putIndex = jest.fn();

    test("does not call showTitle if name = 'Practice'", () => {
      restartGame({ initName: "Practice", showTitle, putIndex });

      expect(showTitle).toHaveBeenCalledTimes(0);
    });

    describe("if name != 'Practice'", () => {
      test("calls initProps.onRestartLevel", () => {
        const { initProps } = useWheelStore();
        initProps.onRestartLevel = jest.fn();
        restartGame({ showTitle, putIndex });
        expect(initProps.onRestartLevel).toHaveBeenCalledTimes(1);
      });
      test("sets isFlipped to false", () => {
        restartGame({ showTitle, putIndex });
        const { initFlipped } = useWheelStore();
        expect(initFlipped).toEqual(false);
      });
      test("calls animate.start with `unflipped`", () => {
        const { animate } = useWheelStore();
        animate.start = jest.fn();
        restartGame({ showTitle, putIndex });
        expect(animate.start).toHaveBeenCalledWith("unflipped");
      });
      test("sets isDragged to false", () => {
        restartGame({ showTitle, putIndex });
        const { initDragged } = useWheelStore();
        expect(initDragged).toEqual(true);
      });
    });
  });

  describe("resizeWheel", () => {
    test("calls animate.start with `resized` if isResized = true", () => {
      const { animate } = useWheelStore();
      animate.start = jest.fn();
      resizeWheel({ isResized: true });
      expect(animate.start).toHaveBeenCalledWith("resized");
    });
    test("calls animate.start with `normal` if isResized = false", () => {
      const { animate } = useWheelStore();
      animate.start = jest.fn();
      resizeWheel({ isResized: false });
      expect(animate.start).toHaveBeenCalledWith("normal");
    });
  });

  describe("onDragEnd", () => {
    test("sets isResized to false", () => {
      onDragEnd();
      const { initResized } = useWheelStore();
      expect(initResized).toEqual(false);
    });
  });

  describe("onDragStart", () => {
    describe("putResize", () => {
      test("set isResized to false if isView !== home", () => {
        const { initResized, initProps } = useWheelStore();
        initProps.onGameStart = jest.fn();
        onDragStart();
        expect(initResized).toEqual(false);
      });
      test("set isResized to true if isView == home", () => {
        const result = isView({ initView: "home" });

        expect(result).toEqual(true);
      });
    });

    test("calls onGameStart", () => {
      const { initProps } = useWheelStore();
      initProps.onGameStart = jest.fn();
      onDragStart();
      expect(initProps.onGameStart).toHaveBeenCalledTimes(1);
    });
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
    describe("calls nothing", () => {
      test("if isFlipped = false and onFocusAll is not empty", () => {
        const isFlipped = false;
        const onFocusAll = jest.fn();
        const result = onFlip({ isFlipped, onFocusAll });
        expect(result).toBeUndefined();
        expect(onFocusAll).toHaveBeenCalledTimes(0);
      });
      test("if isFlipped = true  and onFocusAll is empty", () => {
        const isFlipped = true;
        const onFocusAll = jest.fn();
        const result = onFlip({ isFlipped });
        expect(result).toBeUndefined();
        expect(onFocusAll).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe("variants", () => {
    test("flipped returns an object", () => {
      const { flipped } = variants;
      const result = flipped();

      expect(typeof result).toEqual("object");
    });

    describe("isWidth", () => {
      test("returns width = 330 && height = 365 if appWidth >= 367", () => {
        const { width, height } = isWidth({ initWidth: 400 });
        expect(width).toEqual(330);
        expect(height).toEqual(365);
      });
    });
  });
});
