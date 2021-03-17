import { shallow } from "enzyme";
import { useContents } from "../..";
import { useProps } from "..";

describe("useContents", () => {
  it("renders", () => {
    const Contents = useContents;
    const wrapper = shallow(<Contents />);
    const { putColors } = useProps();
    putColors({ blue: { background: "blue" } });
    expect(wrapper.find("[opacity='1']").isEmptyRender()).toBeFalsy();
  });
});
