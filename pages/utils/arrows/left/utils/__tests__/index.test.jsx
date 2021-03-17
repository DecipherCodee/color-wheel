import { shallow } from "enzyme";
import { useLeft } from "../..";

describe("useLeft", () => {
  it("renders", () => {
    const Left = useLeft;
    const wrapper = shallow(<Left />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
