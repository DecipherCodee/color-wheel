import { shallow } from "enzyme";
import { useLevel } from "..";

describe("useLevel", () => {
  describe("returns", () => {
    let wrapper;

    test("usePanel", () => {
      const { usePanel: Panel } = useLevel();
      wrapper = shallow(<Panel />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
  });
});
