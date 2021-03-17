import { shallow } from "enzyme";
import { useColor } from "../..";

describe("useColor", () => {
  it("renders", () => {
    const Color = useColor;
    const wrapper = shallow(
      <Color position={{ top: 0, left: 0, right: 0, bottom: 0 }} isFocused />
    );
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
