import { shallow } from "enzyme";
import { useSwatchIcon } from "../..";

describe("useSwatchIcon", () => {
  it("renders", () => {
    const SwatchIcon = useSwatchIcon;
    const wrapper = shallow(<SwatchIcon />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
