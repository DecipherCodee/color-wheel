import { shallow } from "enzyme";
import { useStore } from "..";

describe("utils", () => {
  describe("useStore", () => {
    it("returns an object", () => {
      function Store() {
        return useStore();
      }
      const wrapper = shallow(<Store />);
      expect(wrapper).toHaveLength(1);
    });
  });
});
