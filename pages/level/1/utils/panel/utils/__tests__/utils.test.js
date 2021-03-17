import { shallow } from "enzyme";
import Router from "next/router";
import {
  useProps,
  useStore,
  onDrag,
  onDragEnd,
  onAppAnimationEnd,
  onAnimationComplete,
  onTap,
  onDragStart,
  checkViewed,
  checkPracticeContents,
  checkPanel2View,
} from "..";
import {
  useStore as AppStore,
  useProps as appProps,
} from "../../../../../../utils";
import {
  useStore as LeftStore,
  useProps as useLeftProps,
} from "../../../../../../utils/arrows/left/utils";
import { useStore as RightStore } from "../../../../../../utils/arrows/right/utils";
import {
  useStore as TitleStore,
  useProps as titleProps,
} from "../../../../../../utils/layout/header/utils/title/utils";
import { useStore as PracticeStore } from "../../../../../../utils/practice/utils";
import {
  useStore as PracticeContentsStore,
  useProps as usePracticeContentsProps,
} from "../../../../../../utils/practice/utils/contents/utils";
import { useStore as WheelStore } from "../../../../../../utils/wheel/utils";
import {
  useStore as Panel2Store,
  useProps as usePanel2Props,
} from "../../../../../2/utils/panel/utils";
import { useStore as ContentsStore } from "../../../../../2/utils/panel/utils/contents/utils";

describe("utils", () => {
  let useEffect;
  let unmount;
  let callback;
  let wrapper;

  function mockEffect() {
    return useEffect.mockImplementationOnce((f) => f());
  }
  function mockUnmount() {
    return unmount.mockImplementationOnce((f) => {
      callback = f();
      callback();
    });
  }

  const Store = useStore;
  const start = jest.fn();

  afterEach(() => shallow(<Store />));

  beforeEach(() => {
    shallow(<Panel2Store />);
    shallow(<LeftStore />);
    shallow(<RightStore />);
    shallow(<WheelStore />);
  });

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
    mockEffect();

    wrapper = shallow(<Store />);

    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  describe("check", () => {
    test("practiceContents", () => {
      const result = checkPracticeContents({});
      expect(result).toBeNull();
    });
    test("panel2View", () => {
      const result = checkPanel2View({});
      expect(result).toBeNull();
    });

    describe("view", () => {
      test("returns null if isViewed = false", () => {
        const result = checkViewed({});
        expect(result).toBeNull();
      });
      test("returns undefined if isViewed = true", () => {
        const result = checkViewed({ isViewed: true });
        expect(result).toBeUndefined();
      });
    });
  });
  describe("slideIn", () => {
    beforeEach(() => shallow(<TitleStore />));
    const { slideIn } = useProps();

    test("calls animation.start", () => {
      const { animation } = useProps();
      animation.start = start;
      slideIn({ isTap: true });
      expect(start).toHaveBeenCalledWith("current");
    });
    test("sets isPracticeContentsShown = false if showPracticeContents is defined", () => {
      shallow(<PracticeContentsStore />);
      const { putShow } = usePracticeContentsProps();
      putShow(true);
      slideIn({});
      const { initShown } = usePracticeContentsProps();
      expect(initShown).toBeFalsy();
    });
  });
  describe("on", () => {
    describe("drag", () => {
      beforeEach(() => {
        shallow(<TitleStore />);
        const { animation } = useProps();
        animation.start = start;
        const { ref } = appProps();
        ref.current = {
          clientWidth: 300,
        };
      });

      describe("doesn't mounts panel 2", () => {
        test("if mounted", () => {
          const { putMount } = usePanel2Props();
          putMount(true);
          onDrag(null, { point: { x: 20 } });
          const { initMounted } = usePanel2Props();
          expect(initMounted).toBeTruthy();
        });
      });

      describe("isDragged", () => {
        test("does not change if true", () => {
          const { putDrag } = useProps();
          putDrag(true);
          onDrag(null, { point: { x: 20 } });
          const { initDragged } = useProps();
          expect(initDragged).toBeTruthy();
        });
        test("sets true if false", () => {
          const { putDrag } = useProps();
          putDrag(false);
          onDrag(null, { point: { x: 20 } });
          const { initDragged } = useProps();
          expect(initDragged).toBeTruthy();
        });
      });
      describe("sets isTitle = false", () => {
        beforeEach(() => {
          const { putShow } = titleProps();
          putShow(true);
        });

        test("if value <= 40", () => {
          onDrag(null, { point: { x: 20 } });
          const { initShown: isTitle } = titleProps();
          expect(isTitle).toBeFalsy();
        });
        test("if value >= 60", () => {
          onDrag(null, { point: { x: 200 } });
          const { initShown: isTitle } = titleProps();
          expect(isTitle).toBeFalsy();
        });
      });
      describe("end", () => {
        describe("calls animation.start", () => {
          describe("if value < 20", () => {
            test("with 'left'", () => {
              onDragEnd(null, { point: { x: 20 } });
              expect(start).toHaveBeenCalledWith("left");
            });
          });

          test("with 'right1' if value > 80", () => {
            shallow(<PracticeStore />);
            shallow(<ContentsStore />);
            onDragEnd(null, { point: { x: 280 } });
            expect(start).toHaveBeenCalledWith("right1");
          });
          test("with 'current' if value is between 20 && 80", () => {
            onDragEnd(null, { point: { x: 200 } });
            expect(start).toHaveBeenCalledWith("current");
          });
        });
      });
      describe("start", () => {
        test("sets isLeftShown = false", () => {
          shallow(<AppStore />);
          const { putShow: showLeft } = useLeftProps();
          showLeft(true);
          onDragStart();
          const { initShown } = useLeftProps();
          expect(initShown).toBeFalsy();
        });
      });
    });
    describe("animation", () => {
      describe("complete", () => {
        test("if isViewed", () => {
          const { putView, putDrag } = useProps();
          putView(true);
          putDrag(true);
          onAnimationComplete();
          const { initDragged } = useProps();
          expect(initDragged).toBeTruthy();
        });
        describe("isDragged", () => {
          test("if true && isViewed = false", () => {
            const { putView, putDrag } = useProps();
            putView(false);
            putDrag(true);
            onAnimationComplete();
            const { initDragged } = useProps();
            expect(initDragged).toBeFalsy();
          });
          test("if false && isViewed = false", () => {
            const { putView, putDrag } = useProps();
            putView(false);
            putDrag(false);
            onAnimationComplete();
            const { initDragged } = useProps();
            expect(initDragged).toBeFalsy();
          });
        });
      });
      describe("appEnd", () => {
        beforeEach(() => shallow(<AppStore />));

        test("returns null if isAppShown", () => {
          const { putShow } = appProps();
          putShow(true);
          const result = onAppAnimationEnd();
          expect(result).toBeNull();
        });
        test("returns undefined if isAppShown = false", () => {
          jest.spyOn(Router, "push").mockImplementationOnce((f) => jest.fn(f));

          const { putShow } = appProps();
          putShow(false);
          const result = onAppAnimationEnd();
          expect(result).toBeUndefined();
        });
      });
    });
    describe("tap", () => {
      beforeEach(() => {
        const { animation } = useProps();
        animation.start = start;
      });

      test("does not call animation.start if isViewed", () => {
        const { putView } = useProps();
        putView(true);
        onTap();
        expect(start).toHaveBeenCalledTimes(0);
      });
      test("calls animation.start if isViewed = false", () => {
        const { putView } = useProps();
        putView(false);
        onTap();
        expect(start).toHaveBeenCalledWith("current");
      });
    });
  });
  describe("putLeft", () => {
    const { putLeft } = useProps();

    test("returns null if left is the same", () => {
      putLeft({ left: "unset" });
      const result = putLeft({ left: "unset" });
      const { initLeft } = useProps();
      expect(result).toBeNull();
      expect(initLeft).toEqual("unset");
    });
    test("sets left if left is different", () => {
      const result = putLeft({ left: "100%" });
      const { initLeft } = useProps();
      expect(result).toBeUndefined();
      expect(initLeft).toEqual("100%");
    });
  });
});
