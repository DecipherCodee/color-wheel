import { shallow } from "enzyme";
import { useHeaderIcon } from "../..";

describe("useHeaderIcon", () => {
  it("renders", () => {
    const HeaderIcon = useHeaderIcon;
    const wrapper = shallow(<HeaderIcon />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
