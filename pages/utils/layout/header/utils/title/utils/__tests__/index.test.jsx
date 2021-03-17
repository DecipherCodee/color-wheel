import { shallow } from "enzyme";
import { useTitle } from "../..";

describe("useTitle", () => {
  it("renders", () => {
    const Title = useTitle;
    const wrapper = shallow(<Title />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
