import { shallow } from "enzyme";
import { useSettiingsIcon } from "../..";

describe("useSettiingsIcon", () => {
  it("renders", () => {
    const Settings = useSettiingsIcon;
    const wrapper = shallow(<Settings />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
