import { shallow } from "enzyme";
import { useStore, useProps, onClick } from "..";
import { useProps as usePauseProps } from "../../../../utils/layout/footer/utils/pause/utils";
import { useStore as PauseContentsStore } from "../../../../utils/layout/footer/utils/pause/utils/contents/utils";
import { useStore as TitleStore } from "../../../../utils/layout/header/utils/title/utils";
import { useStore as WheelStore } from "../../../../utils/wheel/utils";

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

  describe("useStore", () => {
    test("get called", () => {
      useEffect = jest.spyOn(React, "useEffect");
      unmount = jest.spyOn(React, "useEffect");

      mockUnmount();
      mockEffect();
      mockUnmount();
      mockEffect();

      wrapper = shallow(<Store />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
    test("onTransitionEnd is null", () => {
      const {
        initProps: { onTransitionEnd },
      } = useProps();

      expect(onTransitionEnd).toBeNull();
    });
  });
  describe("on", () => {
    describe("click", () => {
      beforeEach(() => shallow(<PauseContentsStore />));

      test("leaves isGamePaused = false if !isGamePaused", () => {
        const { putPause } = usePauseProps();
        putPause(false);
        onClick();
        const { initPaused } = usePauseProps();
        expect(initPaused).toBeFalsy();
      });
      test("sets isGamePaused = false if isGamePaused", () => {
        shallow(<TitleStore />);
        shallow(<WheelStore />);

        const { putPause } = usePauseProps();
        putPause(true);
        onClick();
        const { initPaused } = usePauseProps();
        expect(initPaused).toBeFalsy();
      });
    });
  });
});
