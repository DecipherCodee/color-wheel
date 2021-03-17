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

  describe("useStore", () => {
    test("get called", () => {
      useEffect = jest.spyOn(React, "useEffect");
      unmount = jest.spyOn(React, "useEffect");

      mockUnmount();
      mockEffect();

      wrapper = shallow(<Store />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
    test("sets isMounted = true", () => {
      const { putMount } = useProps();
      putMount(true);
      const { initMounted } = useProps();
      expect(initMounted).toBeTruthy();
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
  });
});
