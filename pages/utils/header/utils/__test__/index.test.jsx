import { shallow } from "enzyme";
import { useHeader } from "../..";

describe("useHeader", () => {
  it("renders", () => {
    function Header() {
      return useHeader();
    }
    const wrapper = shallow(<Header />);
    expect(wrapper).toHaveLength(1);
  });
});
