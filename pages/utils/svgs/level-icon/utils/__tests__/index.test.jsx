import { shallow } from "enzyme";
import { useLevelIcon } from "../..";

describe("useLevelIcon", () => {
  it("renders", () => {
    const LevelIcon = useLevelIcon;
    const wrapper = shallow(<LevelIcon />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
