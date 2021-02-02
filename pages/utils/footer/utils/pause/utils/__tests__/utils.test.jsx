import { shallow } from "enzyme";
import {
  onAnimationEnd,
  usePauseStore,
  useStore,
  updateCount,
  checkStarted,
  useRender,
  updateShown,
  updateMounted,
  checkMounted,
} from "..";

describe("util", () => {
  describe("useStore", () => {
    it("returns an object", () => {
      function Store() {
        return useStore();
      }
      const wrapper = shallow(<Store />);
      expect(wrapper).toHaveLength(1);
    });
  });

  describe("onAnimationEnd", () => {
    test("sets isMount = false if isShown = false", () => {
      const { initShown } = usePauseStore();
      onAnimationEnd();

      expect(initShown).toEqual(false);
    });
    test("returns undefined if isShown = true", () => {
      const { putShow } = usePauseStore();
      putShow(true);

      onAnimationEnd();

      const { initShown } = usePauseStore();
      expect(initShown).toEqual(true);
    });
  });

  describe("onClick", () => {
    test("returns undefined", () => {
      const { onClick } = usePauseStore();
      const result = onClick();
      expect(result).toBeUndefined();
    });

    describe("checkStarted", () => {
      const animate = { start: jest.fn() };
      const putDrag = jest.fn();

      test("calls putFlip if isStarted = false", () => {
        const putFlip = jest.fn();
        checkStarted({ putFlip, animate, putDrag });
        expect(putFlip).toHaveBeenCalledWith(false);
      });
      test("does not call putFlip if isStarted = true", () => {
        const putFlip = jest.fn();
        checkStarted({ initStarted: true, putFlip, animate, putDrag });
        expect(putFlip).toHaveBeenCalledTimes(0);
      });
    });

    describe("updateCount", () => {
      test("returns false if old = true", () => {
        const result = updateCount(true);
        expect(result).toBeFalsy();
      });
      test("returns true if old = false", () => {
        const result = updateCount(false);
        expect(result).toBeTruthy();
      });
    });
  });

  describe("useRender", () => {
    test("renders", () => {
      const { putMount } = usePauseStore();
      putMount(true);
      function Render() {
        return useRender();
      }
      const wrapper = shallow(<Render />).find("[aria-hidden='true']");
      expect(wrapper).toHaveLength(1);
    });
  });

  describe("update", () => {
    test("isShown", () => {
      updateShown({ isShown: true });
      const { initShown } = usePauseStore();
      expect(initShown).toBeTruthy();
    });

    test("isMounted", () => {
      updateMounted({ isMounted: true });
      const { initMounted } = usePauseStore();
      expect(initMounted).toBeTruthy();
    });
  });

  describe("checkMounted", () => {
    test("returns undefined if isMounted = false", () => {
      const { putMount, putShow } = usePauseStore();
      putMount(false);
      putShow(false);

      checkMounted();

      const { initMounted, initShown } = usePauseStore();
      expect(initMounted).toBeFalsy();
      expect(initShown).toBeFalsy();
    });
    test("sets isShown = true if isMounted = true", () => {
      const { putMount, putShow } = usePauseStore();
      putMount(true);
      putShow(false);

      checkMounted();

      const { initMounted, initShown } = usePauseStore();
      expect(initMounted).toBeTruthy();
      expect(initShown).toBeTruthy();
    });
  });
});
