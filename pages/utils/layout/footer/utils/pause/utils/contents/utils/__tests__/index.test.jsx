import { shallow } from "enzyme";
import { useContents } from "../..";

describe("useContents", () => {
  it("renders", () => {
    const Contents = useContents;
    const wrapper = shallow(<Contents />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
