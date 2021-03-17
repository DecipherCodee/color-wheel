import { shallow } from "enzyme";
import { useStore, onDrag, onDragEnd, useProps, checkViewed } from "..";
import { useProps as usePanel2Props, useStore as Panel2Store } from "../../..";
import { useProps as useAppProps } from "../../../../../../../../utils";
import { useStore as LeftStore } from "../../../../../../../../utils/arrows/left/utils";
import {
  useStore as TitleStore,
  useProps as useTitleProps,
} from "../../../../../../../../utils/layout/header/utils/title/utils";
import { useStore as WheelStore } from "../../../../../../../../utils/wheel/utils";
import {
  useProps as usePanel1Props,
  useStore as Panel1Store,
} from "../../../../../../../1/utils/panel/utils";

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

    mockEffect();
    mockEffect();

    wrapper = shallow(<Store />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  describe("putLeft", () => {
    const { putLeft } = useProps();

    test("sets left to 200%", () => {
      putLeft({ left: "200%" });
      const { initLeft } = useProps();
      expect(initLeft).toEqual("200%");
    });
    test("returns null if left is the same", () => {
      const result = putLeft({ left: "200%" });
      expect(result).toBeNull();
    });
  });
  describe("listener", () => {
    describe("onDrag", () => {
      beforeEach(() => {
        shallow(<TitleStore />);

        const { ref } = useAppProps();
        ref.current = {
          clientWidth: 300,
        };
      });

      test("mounts panel 1 if not mounted", () => {
        shallow(<Panel1Store />);
        const { putMount } = usePanel1Props();
        putMount(false);
        onDrag(null, { point: { x: 20 } });
        const { initMounted } = usePanel1Props();
        expect(initMounted).toBeTruthy();
      });

      describe("sets isTitle = false", () => {
        beforeEach(() => {
          const { putShow } = useTitleProps();
          putShow(true);
        });

        test("if value <= 40", () => {
          onDrag(null, { point: { x: 20 } });
          const { initShown: isTitle } = useTitleProps();
          expect(isTitle).toBeFalsy();
        });
        test("if value >= 60", () => {
          onDrag(null, { point: { x: 200 } });
          const { initShown: isTitle } = useTitleProps();
          expect(isTitle).toBeFalsy();
        });
      });
      describe("end", () => {
        describe("calls animation.start", () => {
          const start = jest.fn();

          beforeEach(() => {
            shallow(<Panel2Store />);
            shallow(<Panel1Store />);
            const { animation } = usePanel2Props();
            animation.start = start;
          });

          test("with 'right2' if value > 80", () => {
            onDragEnd(null, { point: { x: 280 } });
            expect(start).toHaveBeenCalledWith("right2");
          });
          test("with 'current' if value <= 80", () => {
            onDragEnd(null, { point: { x: 200 } });
            expect(start).toHaveBeenCalledWith("current");
          });
        });
      });
    });
  });
  describe("check", () => {
    describe("viewed", () => {
      const start = jest.fn();

      beforeEach(() => {
        shallow(<Panel2Store />);
        const { animation } = usePanel2Props();
        animation.start = start;
      });

      test("calls animation.start if isViewed", () => {
        shallow(<LeftStore />);
        shallow(<WheelStore />);
        const { putView } = usePanel2Props();
        putView(true);
        checkViewed();
        expect(start).toHaveBeenCalledWith("current");
      });
      test("does not call animation.start if isViewed = false", () => {
        const { putView } = usePanel2Props();
        putView(false);
        checkViewed();
        expect(start).toHaveBeenCalledTimes(0);
      });
    });
  });
});
