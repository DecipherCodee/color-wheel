import { shallow } from "enzyme";
import { use1 } from "../../index.page";

describe("use1", () => {
  it("renders", () => {
    const Level1 = use1;
    const wrapper = shallow(<Level1 />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
