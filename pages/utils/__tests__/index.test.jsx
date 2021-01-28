import { shallow } from "enzyme";
import { useHome } from "../../index.page";

describe("index.page.jsx", () => {
  it("returns", () => {
    function Home() {
      return useHome();
    }
    const wrapper = shallow(<Home />);
    expect(wrapper).toHaveLength(1);
  });
});
