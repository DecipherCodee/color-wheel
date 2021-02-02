import { shallow } from "enzyme";
import {
  onTransitionEnd,
  updateProps,
  useStore,
  useTitleStore,
  defaultProps,
  updateShown,
  updateName,
  updateStarted,
  updateCount,
  checkCounter,
  countTime,
  animateWheel,
} from "..";

describe("utils", () => {
  describe("useStore", () => {
    it("returns an object", () => {
      function Store() {
        return useStore();
      }
      const wrapper = shallow(<Store />);
      expect(wrapper).toHaveLength(1);
    });
  });

  describe("getCount", () => {
    test("returns '1:00' if count > 60", () => {
      const { getCount } = useTitleStore();
      const result = getCount({});
      expect(result).toEqual("1:00");
    });
    test("returns '0:0{count}' if count < 60", () => {
      const { getCount } = useTitleStore();
      const result = getCount({ count: 30 });
      expect(result).toEqual("0:30");
    });
  });

  describe("onTransitionEnd", () => {
    test("returns undefined if isView = 'home'", () => {
      const result = onTransitionEnd({ initView: "home" });
      expect(result).toBeUndefined();
    });
    test("calls initProps.onHideLevel if name does not includes 'Level'", () => {
      const { initProps } = useTitleStore();
      initProps.onHideLevel = jest.fn();
      onTransitionEnd({});

      expect(initProps.onHideLevel).toHaveBeenCalledTimes(1);
    });
    test("does not call initProps.onHideLevel if name includes 'Level'", () => {
      const { initProps } = useTitleStore();
      initProps.onHideLevel = jest.fn();
      onTransitionEnd({ name: "Level" });

      expect(initProps.onHideLevel).toHaveBeenCalledTimes(0);
    });
  });

  describe("update", () => {
    describe("props", () => {
      test("set props", () => {
        updateProps({ props: defaultProps });
        const { initProps } = useTitleStore();
        expect(initProps).toEqual(defaultProps);
      });
    });
    describe("shown", () => {
      test("sets isShown", () => {
        updateShown({ isShown: false });
        const { initShown } = useTitleStore();
        expect(initShown).toEqual(false);
      });
    });
    describe("name", () => {
      test("sets name", () => {
        updateName({ name: "Level 1" });
        const { initName } = useTitleStore();
        expect(initName).toEqual("Level 1");
      });
    });
    describe("started", () => {
      test("sets isStarted", () => {
        updateStarted({ isStarted: false });
        const { initStarted } = useTitleStore();
        expect(initStarted).toEqual(false);
      });
    });
    describe("count", () => {
      test("sets count", () => {
        updateCount({ count: 30 });
        const { initCount } = useTitleStore();
        expect(initCount).toEqual(30);
      });
    });
  });

  describe("checkCounter", () => {
    test("returns undefined if isStarted = false", () => {
      const result = checkCounter({});

      expect(result).toBeUndefined();
    });

    describe("isStarted = true", () => {
      test("set isShow = true if count > 0", () => {
        checkCounter({ isStarted: true, count: 30 });
        const { initShown } = useTitleStore();

        expect(initShown).toEqual(true);
      });
      test("set isShow = false if count <= 0", () => {
        checkCounter({ isStarted: true, count: 0 });
        const { initShown } = useTitleStore();
        expect(initShown).toEqual(false);
      });

      describe("countTime", () => {
        test("set count = 5 if initCount = 6", () => {
          const setCount = jest.fn();

          countTime({ setCount });

          expect(setCount).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe("animateWheel", () => {
    test("returns undefined if onAnimateWheel is empty", () => {
      const result = animateWheel({});
      expect(result).toBeUndefined();
    });
    test("calls onAnimateWheel if onAnimateWheel is not empty", () => {
      const onAnimateWheel = jest.fn();
      animateWheel({ onAnimateWheel });
      expect(onAnimateWheel).toHaveBeenCalledTimes(1);
    });
  });
});
