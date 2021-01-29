import { shallow } from "enzyme";
import { useWheel } from "../..";

describe("wheel", () => {
  it("renders", () => {
    function Wheel() {
      return useWheel();
    }
    const wrapper = shallow(<Wheel />);
    expect(wrapper).toHaveLength(1);
  });
});
