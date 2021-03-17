import { shallow } from "enzyme";
import { useDecipherCodeLogo } from "../..";

describe("useDecipherCodeLogo", () => {
  it("renders", () => {
    const DecipherCode = useDecipherCodeLogo;
    const wrapper = shallow(<DecipherCode />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
