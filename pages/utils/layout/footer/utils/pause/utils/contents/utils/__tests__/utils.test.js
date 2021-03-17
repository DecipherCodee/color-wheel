import { shallow } from "enzyme";
import { useStore, useProps } from "..";
import { useStore as WheelStore } from "../../../../../../../../wheel/utils";
import {
  useStore as TitleStore,
  useProps as useTitleProps,
} from "../../../../../../../header/utils/title/utils";

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

    mockEffect();

    wrapper = shallow(<Store />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  describe("on", () => {
    describe("click", () => {
      const { onClick } = useProps();

      beforeEach(() => {
        shallow(<TitleStore />);
        shallow(<WheelStore />);
      });

      test("sets isStarted = false if true", () => {
        const { putStart } = useTitleProps();
        putStart(true);
        onClick();
        const { initStarted } = useTitleProps();
        expect(initStarted).toBeFalsy();
      });
      test("sets isStarted = true if false", () => {
        const { putStart } = useTitleProps();
        putStart(false);
        onClick();
        const { initStarted } = useTitleProps();
        expect(initStarted).toBeTruthy();
      });
    });
  });
});
