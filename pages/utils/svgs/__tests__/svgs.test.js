import { shallow } from "enzyme";
import { useSVGs } from "..";

describe("useSVGs", () => {
  test("SubHeaderIcon", () => {
    const { useSubHeaderIcon: SubHeaderIcon } = useSVGs();
    const wrapper = shallow(<SubHeaderIcon />);

    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
  test("HeaderIcon", () => {
    const { useHeaderIcon: HeaderIcon } = useSVGs();
    const wrapper = shallow(<HeaderIcon />);

    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
  test("SettingsIcon", () => {
    const { useSettingsIcon: SettingsIcon } = useSVGs();
    const wrapper = shallow(<SettingsIcon />);

    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
  test("DecipherCodeLogo", () => {
    const { useDecipherCodeLogo: DecipherCodeLogo } = useSVGs();
    const wrapper = shallow(<DecipherCodeLogo />);

    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
  test("ColorWheelLogo", () => {
    const { useColorWheelLogo: ColorWheelLogo } = useSVGs();
    const wrapper = shallow(<ColorWheelLogo />);

    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
  test("SwatchIcon", () => {
    const { useSwatchIcon: SwatchIcon } = useSVGs();
    const wrapper = shallow(<SwatchIcon />);

    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
  test("LevelIcon", () => {
    const { useLevelIcon: LevelIcon } = useSVGs();
    const wrapper = shallow(<LevelIcon />);

    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
