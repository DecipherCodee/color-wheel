import { shallow } from "enzyme";
import { useRight } from "../..";

describe("useRight", () => {
  it("renders", () => {
    const Right = useRight;
    const wrapper = shallow(<Right />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
