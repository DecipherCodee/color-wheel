import { shallow } from "enzyme";
import { use2 } from "../../index.page";

describe("use2", () => {
  it("renders", () => {
    const Level2 = use2;
    const wrapper = shallow(<Level2 />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
