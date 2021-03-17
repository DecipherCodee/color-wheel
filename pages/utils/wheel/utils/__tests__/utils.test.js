import { shallow } from "enzyme";
import {
  useStore,
  useProps,
  useContents,
  isWidth,
  onFlip,
  onDragStart,
  onDragEnd,
  checkFlipped,
  checkWheel,
} from "..";
import { useProps as useAppProps } from "../../..";
import { useStore as TitleStore } from "../../../layout/header/utils/title/utils";

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
    mockEffect();

    wrapper = shallow(<Store />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  describe("isWidth", () => {
    test("returns width = 330 if appWidth >= 367", () => {
      const { ref } = useAppProps();
      ref.current = {
        clientWidth: 367,
      };
      const { width } = isWidth();
      expect(width).toEqual(330);
    });
    test("returns width = 80% if appWidth < 367", () => {
      const { ref } = useAppProps();
      ref.current = {
        clientWidth: 360,
      };
      const { width } = isWidth();
      expect(width).toEqual("80%");
    });
    test("returns y = -(appHeight / 2 - height / 2) / 2 if appWidth >= 380", () => {
      const { ref } = useAppProps();
      ref.current = {
        clientWidth: 380,
        clientHeight: 405,
      };
      const { y, height } = isWidth();
      expect(y).toEqual(-(ref.current.clientHeight / 2 - height / 2) / 2);
    });
    test("returns y = -40 if appWidth < 380", () => {
      const { ref } = useAppProps();
      ref.current = {
        clientWidth: 360,
        clientHeight: 405,
      };
      const { y } = isWidth();
      expect(y).toEqual(-40);
    });
  });
  describe("on", () => {
    describe("flip", () => {
      test("returns x = 0", () => {
        const { x } = onFlip();
        expect(x).toEqual(0);
      });
    });
    describe("drag", () => {
      describe("start", () => {
        const onStart = jest.fn();

        test("calls props.onDragStart", () => {
          const { putProps } = useProps();
          putProps((old) => ({
            ...old,
            onDragStart: onStart,
          }));
          onDragStart();
          expect(onStart).toHaveBeenCalledTimes(1);
        });
        test("doesn't call props.onDragStart if unset", () => {
          const { putProps } = useProps();
          putProps({
            onDragStart: null,
          });
          onDragStart();
          expect(onStart).toHaveBeenCalledTimes(0);
        });
      });
      describe("end", () => {
        test("sets isResized = false", () => {
          onDragEnd();
          const { initResized } = useProps();
          expect(initResized).toBeFalsy();
        });
      });
    });
    describe("gameOver", () => {
      test("sets isFlipped = true", () => {
        const { onGameOver, putFlip } = useProps();
        putFlip(false);
        onGameOver();
        const { initFlipped } = useProps();
        expect(initFlipped).toBeTruthy();
      });
    });
  });
  describe("check", () => {
    describe("flipped", () => {
      test("sets isDragged = true if !isFlipped", () => {
        checkFlipped({});
        const { initDragged } = useProps();
        expect(initDragged).toBeTruthy();
      });
      test("doesn't sets isDragged = true if isFlipped", () => {
        shallow(<TitleStore />);
        const { putDrag } = useProps();
        putDrag(false);
        checkFlipped({ isFlipped: true });
        const { initDragged } = useProps();
        expect(initDragged).toBeFalsy();
      });
    });
    describe("wheel", () => {
      describe("calls animation.start with 'normal'", () => {
        const start = jest.fn();

        beforeEach(() => {
          const { animation } = useProps();
          animation.start = start;
        });

        test("if !isResized && isDragged", () => {
          checkWheel({ isDragged: true });
          expect(start).toHaveBeenCalledWith("normal");
        });
        test("if !isDragged", () => {
          checkWheel({});
          expect(start).toHaveBeenCalledWith("normal");
        });
      });
    });
  });
  describe("dynamic", () => {
    describe("useContents", () => {
      it("renders", () => {
        const Contents = useContents;
        wrapper = shallow(<Contents />);
        expect(wrapper.isEmptyRender()).toBeFalsy();
      });
    });
    describe("useWheel", () => {
      it("renders", () => {
        const { useWheel: Wheel } = useProps();
        wrapper = shallow(<Wheel />);
        expect(wrapper.isEmptyRender()).toBeFalsy();
      });
    });
  });
  describe("reset", () => {
    const { reset } = useProps();

    test("sets isFlipped = false", () => {
      const { putFlip } = useProps();
      putFlip(true);
      reset({});
      const { initFlipped } = useProps();
      expect(initFlipped).toBeFalsy();
    });
    test("calls putIndex if defined", () => {
      const putIndex = jest.fn();
      reset({ putIndex });
      expect(putIndex).toHaveBeenCalledWith(0);
    });
  });
});
