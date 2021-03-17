import { shallow } from "enzyme";
import { useStore, useProps, countTime, checkCounter } from "..";
import { useStore as WheelStore } from "../../../../../../wheel/utils";
import { useStore as PauseContentsStore } from "../../../../../footer/utils/pause/utils/contents/utils";

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

  afterEach(() => shallow(<Store />));

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

    mockEffect();

    wrapper = shallow(<Store />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  describe("reset", () => {
    const { reset } = useProps();

    test("sets isStarted = true if time is defined", () => {
      reset({ time: 20 });
      const { initStarted } = useProps();
      expect(initStarted).toBeTruthy();
    });
    test("sets isStarted = false if name is defined", () => {
      reset({ name: "level" });
      const { initStarted } = useProps();
      expect(initStarted).toBeFalsy();
    });
  });
  describe("countTime", () => {
    const setCount = jest.fn();

    test("calls count", () => {
      countTime({ setCount });
      const { initCount } = useProps();
      expect(setCount).toHaveBeenCalledWith(initCount - 1);
    });
  });
  describe("check", () => {
    describe("counter", () => {
      test("doesn't set isShown = false if !isStarted", () => {
        const { putShow } = useProps();
        putShow(true);
        checkCounter({});
        const { initShown } = useProps();
        expect(initShown).toBeTruthy();
      });

      describe("if isStarted", () => {
        test("sets isShown = false", () => {
          shallow(<WheelStore />);
          shallow(<PauseContentsStore />);

          const { putShow } = useProps();
          putShow(true);
          checkCounter({ isStarted: true });
          const { initShown } = useProps();
          expect(initShown).toBeFalsy();
        });
        test("sets isShown = true if count > 0", () => {
          const { putShow } = useProps();
          putShow(false);
          checkCounter({ isStarted: true, count: 2 });
          const { initShown } = useProps();
          expect(initShown).toBeTruthy();
        });
      });
    });
  });
  describe("getCount", () => {
    const { getCount } = useProps();

    test("returns '1:00' if count > 60", () => {
      const result = getCount({});
      expect(result).toEqual("1:00");
    });
    test("returns '0:0{count}' if count < 60", () => {
      const result = getCount({ count: 30 });
      expect(result).toEqual("0:30");
    });
  });
  describe("update", () => {
    describe("title", () => {
      test("sets name", () => {
        const { updateTitle } = useProps();
        const name = "name";
        updateTitle({ name });
        const { initName } = useProps();
        expect(initName).toEqual(name);
      });
    });
  });
});
