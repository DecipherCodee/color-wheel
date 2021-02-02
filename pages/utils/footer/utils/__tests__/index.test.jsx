import { shallow } from "enzyme";
import { useFooter } from "../..";

describe("useFooter", () => {
  it("renders", () => {
    function Footer() {
      return useFooter();
    }
    const wrapper = shallow(<Footer />);
    expect(wrapper).toHaveLength(1);
  });
});
