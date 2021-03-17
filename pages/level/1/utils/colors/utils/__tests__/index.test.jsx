import { shallow } from "enzyme";
import { useColors } from "../..";

describe("useColors", () => {
  it("renders", () => {
    const Colors = useColors;
    const wrapper = shallow(<Colors />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
