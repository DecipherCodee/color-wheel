import { shallow } from "enzyme";
import { usePanel } from "../..";

describe("usePanel", () => {
  it("renders with unlock aside", () => {
    const Panel = usePanel;
    const wrapper = shallow(
      <Panel difficulty="Hard" swatches={{ swatch1: {}, swatch2: {} }} />
    ).find("[test='unlock']");

    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
  it("renders with lock aside", () => {
    const Panel = usePanel;
    const wrapper = shallow(
      <Panel swatches={{ swatch1: {}, swatch2: {} }} />
    ).find("[test='lock']");

    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
