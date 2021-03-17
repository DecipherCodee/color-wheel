import { shallow } from "enzyme";
import { useStore, useProps } from "..";
import { useStore as TilteStore } from "../../../../layout/header/utils/title/utils";
import { useStore as LeftStore } from "../../../left/utils";

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

  afterEach(() => {
    shallow(<Store />);
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
    mockEffect();

    wrapper = shallow(<Store />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  describe("listener", () => {
    describe("onClick", () => {
      test("sets isShown to false", () => {
        const { onClick } = useProps();
        shallow(<TilteStore />);
        shallow(<LeftStore />);
        onClick({ isRight: true });
        const { initShown } = useProps();
        expect(initShown).toBeTruthy();
      });
    });
  });
});
