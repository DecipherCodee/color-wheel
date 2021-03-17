import { shallow } from "enzyme";
import { useWheel } from "../..";
import { useProps } from "..";

describe("useWheel", () => {
  it("renders with Contents", () => {
    const Wheel = useWheel;
    const wrapper = shallow(<Wheel />);
    const { putFlip } = useProps();
    putFlip(true);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
