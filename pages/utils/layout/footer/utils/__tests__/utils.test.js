import { shallow } from "enzyme";
import { useStore, usePause } from "..";

describe("utils", () => {
  // let useEffect;
  // let unmount;
  // let callback;
  let wrapper;

  // function mockUnmount() {
  //   return unmount.mockImplementationOnce((f) => {
  //     callback = f();
  //     callback();
  //   });
  // }
  // function mockEffect() {
  //   return useEffect.mockImplementationOnce((f) => f());
  // }

  const Store = useStore;

  afterEach(() => shallow(<Store />));

  test("calls useStore", () => {
    // useEffect = jest.spyOn(React, "useEffect");
    // unmount = jest.spyOn(React, "useEffect");

    // mockUnmount();
    // mockEffect();

    wrapper = shallow(<Store />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  describe("dynamic", () => {
    describe("usePause", () => {
      it("renders", () => {
        const Pause = usePause;
        wrapper = shallow(<Pause />);
        expect(wrapper.isEmptyRender()).toBeFalsy();
      });
    });
  });
});
