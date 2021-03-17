import { shallow } from "enzyme";
import { useStore, useContents, useProps } from "..";

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
    test("sets mount", () => {
      const { putMount } = useProps();
      putMount(true);
      const { initMounted } = useProps();
      expect(initMounted).toBeTruthy();
    });
  });
});
