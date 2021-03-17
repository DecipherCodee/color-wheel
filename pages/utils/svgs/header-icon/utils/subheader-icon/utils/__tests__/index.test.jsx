import { shallow } from "enzyme";
import { useSubHeaderIcon } from "../..";

describe("useSubHeaderIcon", () => {
  it("renders", () => {
    const SubHeader = useSubHeaderIcon;
    const wrapper = shallow(<SubHeader />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
