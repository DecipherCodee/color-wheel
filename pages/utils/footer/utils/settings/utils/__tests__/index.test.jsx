import { shallow } from "enzyme";
import { useSettings } from "../..";

describe("useSettings", () => {
  it("renders", () => {
    function Settings() {
      return useSettings();
    }
    const wrapper = shallow(<Settings />);
    expect(wrapper).toHaveLength(1);
  });
});
