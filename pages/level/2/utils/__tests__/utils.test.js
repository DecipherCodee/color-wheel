import { shallow } from "enzyme";
import { useStore } from "..";

describe("utils", () => {
  // let useEffect;
  let wrapper;

  // function mockEffect() {
  //   return useEffect.mockImplementationOnce((f) => f());
  // }

  const Store = useStore;

  afterEach(() => {
    shallow(<Store />);
  });

  test("calls Store", () => {
    // useEffect = jest.spyOn(React, "useEffect");
    // mockEffect();
    wrapper = shallow(<Store />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
