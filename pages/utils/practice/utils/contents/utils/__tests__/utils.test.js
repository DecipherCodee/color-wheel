import { shallow } from "enzyme";
import {
  useStore,
  useProps,
  isColor,
  isPosition,
  whilePosition,
  whileColor,
  checkShown,
  checkColors,
  checkBackground,
  onAnimationEnd,
  onAllFocused,
  onRestart,
  onQuit,
  onDrag,
} from "..";
import {
  useProps as usePracticeProps,
  useStore as PracticeStore,
} from "../../..";
import { useStore as Panel1Store } from "../../../../../../level/1/utils/panel/utils";
import { useStore as LeftStore } from "../../../../../arrows/left/utils";
import { useStore as RightStore } from "../../../../../arrows/right/utils";
import {
  useStore as TitleStore,
  useProps as useTitleProps,
} from "../../../../../layout/header/utils/title/utils";
import {
  useStore as WheelStore,
  useProps as useWheelProps,
} from "../../../../../wheel/utils";

describe("utils", () => {
  let useEffect;
  let unmount;
  let callback;
  let wrapper;

  function mockUnmount() {
    return unmount.mockImplementationOnce((f) => {
      callback = f();
      callback();
    });
  }
  function mockEffect() {
    return useEffect.mockImplementationOnce((f) => f());
  }

  const Store = useStore;
  const colors = {
    blue: {
      background: "blue",
      position: { right: "7vw", top: "5vh" },
      isFocused: false,
    },
  };
  afterEach(() => shallow(<Store />));
  beforeEach(() => shallow(<WheelStore />));

  test("calls useStore", () => {
    useEffect = jest.spyOn(React, "useEffect");
    unmount = jest.spyOn(React, "useEffect");

    mockUnmount();
    mockEffect();

    mockUnmount();
    mockEffect();

    mockUnmount();
    mockEffect();

    mockUnmount();
    mockEffect();

    mockUnmount();
    mockEffect();

    mockEffect();
    mockEffect();
    mockEffect();

    wrapper = shallow(<Store />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  describe("on", () => {
    beforeEach(() => shallow(<TitleStore />));

    describe("restart", () => {
      test("sets isShown = false", () => {
        const { putShow } = useProps();
        putShow(true);
        onRestart();
        const { initShown } = useProps();
        expect(initShown).toBeFalsy();
      });
    });
    describe("quit", () => {
      test("sets title to 'Level 1", () => {
        shallow(<LeftStore />);
        shallow(<RightStore />);
        shallow(<Panel1Store />);
        onQuit();
        const { initName } = useTitleProps();
        expect(initName).toEqual("Level 1");
      });
    });
    describe("allFocused", () => {
      test("returns a string", () => {
        const result = onAllFocused();
        expect(typeof result).toEqual("string");
      });
    });
    describe("drag", () => {
      test("calls forEach", () => {
        const forEach = jest.fn();
        global.document = {
          elementsFromPoint() {
            return {
              forEach,
            };
          },
        };
        onDrag({ clientX: 3, clientY: 5 });
        expect(forEach).toHaveBeenCalledTimes(1);
      });
    });
    describe("animationEnd", () => {
      test("doesn't set colors = {} if isShown", () => {
        const { putShow, putDone } = useProps();
        putDone(true);
        putShow(true);
        onAnimationEnd();
        const { initColors } = useProps();
        expect(initColors).not.toEqual({});
      });

      describe("if !isShown", () => {
        beforeEach(() => {
          shallow(<PracticeStore />);
          const { putShow } = useProps();
          putShow(false);
        });

        test("unmounts practice", () => {
          const { putView } = useProps();
          putView(true);
          onAnimationEnd();
          const { initMounted } = usePracticeProps();
          expect(initMounted).toBeFalsy();
        });

        describe("if isDone", () => {
          beforeEach(() => {
            const { putDone } = useProps();
            putDone(true);
          });

          test("sets isViewed = true if !isViewed", () => {
            const { putView } = useProps();
            putView(false);
            onAnimationEnd();
            const { initViewed } = useProps();
            expect(initViewed).toBeTruthy();
          });
          test("sets colors = {}", () => {
            onAnimationEnd();
            const { initColors } = useProps();
            expect(initColors).toEqual({});
          });
        });
      });
    });
  });
  describe("is", () => {
    describe("color", () => {
      test("returns boolean", () => {
        const result = isColor({
          colors,
          getColor: "blue",
        });
        expect(result).toBeTruthy();
      });
    });
    describe("position", () => {
      describe("returns strings", () => {
        test("if top", () => {
          const result = isPosition({
            colors,
            getPosition: "top",
            getValue: 5,
          });
          expect(result).toEqual("blue");
        });
      });
    });
  });
  describe("check", () => {
    describe("shown", () => {
      test("doesn't set wheel props if !isShown", () => {
        checkShown({});
        const {
          initProps: { onDrag: onWheelDrag },
        } = useWheelProps();
        expect(onWheelDrag).toBeNull();
      });
    });
    describe("background", () => {
      test("returns a string", () => {
        const result = checkBackground({ colors });
        expect(typeof result).toEqual("string");
      });
    });
    describe("colors", () => {
      describe("if length > 0", () => {
        test("doesn't set isDone = true if !isAllUnfocused", () => {
          const { putDone } = useProps();
          putDone(false);
          checkColors({ colors });
          const { initDone } = useProps();
          expect(initDone).toBeFalsy();
        });
        test("sets isDone = true if isAllUnfocused", () => {
          const { putDone } = useProps();
          putDone(false);
          colors.blue.isFocused = true;
          checkColors({ colors });
          const { initDone } = useProps();
          expect(initDone).toBeTruthy();
        });
      });
    });
  });
  describe("while", () => {
    describe("position", () => {
      test("returns a number", () => {
        colors.blue.position.top = "3vh";
        const result = whilePosition({ colors, value: 3, getPosition: "top" });
        expect(typeof result).toEqual("number");
      });
    });
    describe("color", () => {
      test("returns a number", () => {
        const result = whileColor({ colors, background: "blue" });
        expect(typeof result).toEqual("string");
      });
    });
  });
});
