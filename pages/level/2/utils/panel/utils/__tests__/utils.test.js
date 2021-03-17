import { shallow } from "enzyme";
import { useProps, useStore, useContents } from "..";

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

    mockEffect();

    wrapper = shallow(<Store />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  describe("dynamic", () => {
    test("useContents", () => {
      const Contents = useContents;
      wrapper = shallow(<Contents />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
  });
  describe("useProps", () => {
    test("sets animation.start", () => {
      const {
        animation: { start },
      } = useProps();
      expect(typeof start).toEqual("function");
    });
  });
});
