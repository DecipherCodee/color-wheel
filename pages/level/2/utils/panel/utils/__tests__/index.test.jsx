import { shallow } from "enzyme";
import { usePanel } from "../..";
import { useProps } from "..";

describe("usePanel", () => {
  it("renders", () => {
    const Panel = usePanel;
    const wrapper = shallow(<Panel />);
    const { putMount } = useProps();
    putMount(true);
    wrapper.shallow();
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
