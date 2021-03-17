import { shallow } from "enzyme";
import {
  defaultColors,
  useStore,
  useProps,
  checkColors,
  onTransitionEnd,
  onAllFocused,
  onRestart,
  onQuit,
  onDrag,
} from "..";
import { useProps as use1Props, useStore as Level1Store } from "../../..";
import { useStore as PauseStore } from "../../../../../../utils/layout/footer/utils/pause/utils";
import { useStore as PauseContentsStore } from "../../../../../../utils/layout/footer/utils/pause/utils/contents/utils";
import {
  useProps as useTitleProps,
  useStore as TitleStore,
} from "../../../../../../utils/layout/header/utils/title/utils";
import { useStore as WheelStore } from "../../../../../../utils/wheel/utils";

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

  beforeEach(() => {
    shallow(<WheelStore />);
    shallow(<TitleStore />);
    shallow(<PauseContentsStore />);
    shallow(<PauseStore />);
  });
  afterEach(() => shallow(<Store />));

  test("calls useStore", () => {
    useEffect = jest.spyOn(React, "useEffect");
    unmount = jest.spyOn(React, "useEffect");

    mockUnmount();
    mockEffect();
    mockUnmount();
    mockEffect();

    mockEffect();
    mockEffect();

    wrapper = shallow(<Store />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  describe("useColors", () => {
    it("renders", () => {
      const { useColors: Colors } = useProps();
      wrapper = shallow(<Colors />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
  });
  describe("check", () => {
    describe("colors", () => {
      test("doesn't set count to 0 if isAllUnfocused = false", () => {
        const { putCount } = useTitleProps();
        putCount(undefined);
        checkColors({ colors: defaultColors });
        const { initCount } = useTitleProps();
        expect(initCount).toBeUndefined();
      });
      test("sets count to 0 if isAllUnfocused", () => {
        checkColors({
          colors: {
            aliceblue: {
              isFocused: true,
              index: 0,
            },
          },
        });
        const { initCount } = useTitleProps();
        expect(initCount).toEqual(0);
      });
    });
  });
  describe("on", () => {
    describe("transitionEnd", () => {
      const set = jest.fn();
      const value = "test";

      beforeEach(() => shallow(<Level1Store />));

      test("doesn't set value if isLevel1Shown", () => {
        const { putShow } = use1Props();
        putShow(true);
        onTransitionEnd({ set, value });
        expect(set).toHaveBeenCalledTimes(0);
      });
      test("sets value if isLevel1Shown = false", () => {
        const { putShow } = use1Props();
        putShow(false);
        onTransitionEnd({ set, value });
        expect(set).toHaveBeenCalledWith(value);
      });
      test("doesn't set isLevel1Shown to true if value !== '/'", () => {
        const { putShow } = use1Props();
        putShow(false);
        onTransitionEnd({ set, value: "/" });
        const { initShown } = use1Props();
        expect(initShown).toBeFalsy();
      });
    });
    describe("allFocused", () => {
      test("returns a boolean", () => {
        const result = onAllFocused();
        expect(typeof result).toEqual("string");
      });
    });
    describe("restart", () => {
      test("sets isLevel1Shown to false", () => {
        onRestart();
        const { initShown: is1Shown } = use1Props();
        expect(is1Shown).toBeFalsy();
      });
    });
    describe("quit", () => {
      test("sets isLevel1Shown to false", () => {
        onQuit();
        const { initShown: is1Shown } = use1Props();
        expect(is1Shown).toBeFalsy();
      });
    });
    describe("drag", () => {
      const clientX = 32;
      const clientY = 3;

      test("returns null if isStarted = false", () => {
        const { putStart } = useTitleProps();
        putStart(false);
        const result = onDrag({ clientX, clientY });

        expect(result).toBeNull();
      });
      test("returns undefined if isStarted", () => {
        global.document = {
          elementsFromPoint() {
            return {
              length: 3,
              forEach: jest.fn(),
            };
          },
        };
        const { putStart } = useTitleProps();
        putStart(true);
        const result = onDrag({ clientX, clientY });

        expect(result).toBeUndefined();
      });
    });
  });
});
