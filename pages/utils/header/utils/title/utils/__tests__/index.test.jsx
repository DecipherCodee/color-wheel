import { shallow } from "enzyme";
import { useTitle } from "../..";

describe("useTitle", () => {
  it("renders", () => {
    function Title() {
      return useTitle();
    }
    const wrapper = shallow(<Title />);
    expect(wrapper).toHaveLength(1);
  });
});
