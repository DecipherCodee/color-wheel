import { shallow } from "enzyme";
import {
  refreshRate,
  useStore,
  isUpdateTime,
  updatePosition,
  putPosition,
  update,
  onMouseLeave,
  onMouseEnter,
  onMouseMove,
  onTouchEnd,
  onTouchStart,
  onTouchMove,
  checkHovered,
  onTilted,
} from "..";

describe("utils", () => {
  let useEffect;
  let callback;
  let wrapper;

  function mockEffect() {
    return useEffect.mockImplementationOnce((f) => {
      callback = f();
      callback();
    });
  }

  const Store = useStore;
  const clientX = 12;
  const clientY = 15;
  const setPosition = jest.fn();
  const animation = {
    start: jest.fn(),
  };
  const setCount = jest.fn();
  const ref = { current: { offsetHeight: 74, offsetWidth: 23 } };

  afterEach(() => {
    shallow(<Store />);
  });

  test("calls useStore", () => {
    useEffect = jest.spyOn(React, "useEffect");
    mockEffect();

    wrapper = shallow(<Store isShown />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  describe("update", () => {
    test("calls animation.start with 'tilted'", () => {
      update({ clientX, clientY, setPosition, animation });

      expect(animation.start).toHaveBeenCalledWith("tilted");
    });

    describe("isUpdateTime", () => {
      const counter = 2;
      const value = counter + 1;
      const isToUpdate = value % refreshRate === 0;
      let result;

      test("returns isToUpdate", () => {
        result = isUpdateTime({ counter, setCount });
        expect(result).toEqual(isToUpdate);
      });
      test("calls setCount with value", () => {
        result = isUpdateTime({ counter, setCount });
        expect(setCount).toHaveBeenCalledWith(value);
      });
    });

    describe("updatePosition", () => {
      test("calls setPosition", () => {
        updatePosition({ clientX, clientY, setPosition });
        expect(setPosition).toHaveBeenCalledTimes(1);
      });
      test("putPosition", () => {
        const xOrigin = 2;
        const yOrigin = 5;
        const old = { xOrigin, yOrigin };
        const result = putPosition({ clientY, clientX }, old);
        expect(result).toEqual({
          ...old,
          x: clientX - xOrigin,
          y: clientY - yOrigin,
        });
      });
    });
  });
  describe("listener", () => {
    describe("mouse event", () => {
      test("onMouseLeave", () => {
        onMouseLeave({ animation });
        expect(animation.start).toHaveBeenCalledWith("normal");
      });

      test("onMouseEnter", () => {
        onMouseEnter({ animation, setPosition }, { clientY, clientX });
        expect(setPosition).toHaveBeenCalledTimes(1);
      });

      describe("onMouseMove", () => {
        test("calls setPosition if isUpdateTime", () => {
          onMouseMove(
            { counter: 9, setCount, animation, setPosition },
            { clientX, clientY }
          );
          expect(setPosition).toHaveBeenCalledTimes(1);
        });
        test("does not call setPosition if isUpdateTime = false", () => {
          onMouseMove(
            { counter: 8, setCount, animation, setPosition },
            { clientX, clientY }
          );
          expect(setPosition).toHaveBeenCalledTimes(0);
        });
      });
    });
    describe("touch event", () => {
      const touches = [{ clientX, clientY }];

      test("onTouchEnd", () => {
        onTouchEnd({ animation });
        expect(animation.start).toHaveBeenCalledWith("normal");
      });

      test("onTouchStart", () => {
        onTouchStart({ animation, setPosition }, { touches });
        expect(setPosition).toHaveBeenCalledTimes(1);
      });

      describe("onTouchMove", () => {
        test("calls setPosition if isUpdateTime", () => {
          onTouchMove(
            { counter: 9, setCount, animation, setPosition },
            { touches }
          );
          expect(setPosition).toHaveBeenCalledTimes(1);
        });
        test("does not call setPosition if isUpdateTime = false", () => {
          onTouchMove(
            { counter: 8, setCount, animation, setPosition },
            { touches }
          );
          expect(setPosition).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
  describe("check", () => {
    test("hovered", () => {
      checkHovered({
        ref,
        isHovered: true,
        counter: 2,
        setCount,
        animation,
        setPosition,
      });
      expect(ref.current.onmouseleave).not.toBeNull();
    });
  });
  describe("variants", () => {
    test("onTilted returns an object", () => {
      const x = 4;
      const y = 6;
      const rotateX = (y / ref.current.offsetHeight / 2).toFixed(2) * 15;
      const rotateY = (x / ref.current.offsetWidth / 2).toFixed(2) * 15;
      const result = onTilted({ ref, position: { x, y } });
      expect(result).toEqual({ rotateX, rotateY });
    });
  });
});
