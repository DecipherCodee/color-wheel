import { shallow } from "enzyme";
import { useArrows, putOnClick, onPress, onArrows } from "..";
import { useStore as TitleStore } from "../../layout/header/utils/title/utils";

describe("useArrows", () => {
  const onClick = jest.fn();

  describe("dynamic", () => {
    let wrapper;

    test("useLeft", () => {
      const { useLeft: Left } = useArrows();
      wrapper = shallow(<Left />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
    test("useRight", () => {
      const { useRight: Right } = useArrows();
      wrapper = shallow(<Right />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
  });
  describe("putOnClick", () => {
    test("returns an object", () => {
      const old = {};
      const result = putOnClick({ onClick }, old);
      expect(result).toEqual({ ...old, onClick });
    });
  });
  describe("putArrows", () => {
    describe("putProps", () => {
      test("get called if defined", () => {
        const { putArrows } = useArrows();
        const putProps = jest.fn();
        putArrows({ putProps });
        expect(putProps).toHaveBeenCalledTimes(1);
      });
      test("doesn't get called if undefined", () => {
        const { putArrows } = useArrows();
        const putProps = jest.fn();
        putArrows({});
        expect(putProps).toHaveBeenCalledTimes(0);
      });
    });
  });
  describe("on", () => {
    const position = jest.fn();
    const mount = jest.fn();
    const thisView = jest.fn();
    const animate = jest.fn();

    describe("press", () => {
      test("calls onClick", () => {
        shallow(<TitleStore />);
        const isLeft = false;
        const isRight = false;
        onPress({
          onClick,
          position,
          mount,
          thisView,
          animate,
          isLeft,
          isRight,
        });
        expect(onClick).toHaveBeenCalledWith({ isLeft, isRight });
      });
    });
    describe("arrows", () => {
      test("calls nextView with true if defined", () => {
        const nextView = jest.fn();
        onArrows({ position, mount, thisView, animate, nextView });
        expect(nextView).toHaveBeenCalledWith(true);
      });
      test("calls unmount with false if defined", () => {
        const unmount = jest.fn();
        onArrows({ position, mount, thisView, animate, unmount });
        expect(unmount).toHaveBeenCalledWith(false);
      });
      test("doesn't call mount if undefoned", () => {
        onArrows({ position, thisView, animate });
        expect(mount).toHaveBeenCalledTimes(0);
      });
    });
  });
});
