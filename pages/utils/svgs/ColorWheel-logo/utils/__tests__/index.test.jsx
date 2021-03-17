import { shallow } from "enzyme";
import { useColorWheelLogo } from "../..";

describe("useColorWheelLogo", () => {
  it("renders", () => {
    const ColorWheel = useColorWheelLogo;
    const wrapper = shallow(<ColorWheel />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
