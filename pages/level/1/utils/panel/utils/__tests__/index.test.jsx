import { shallow } from "enzyme";
import { usePanel } from "../..";

describe("usePanel", () => {
  it("renders", () => {
    const Panel = usePanel;
    const wrapper = shallow(<Panel />).find("[difficulty='Hard']");
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
