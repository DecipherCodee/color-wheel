import { shallow } from "enzyme";
import { useSVGs } from "..";

describe("useSVGs", () => {
  test("PauseName", () => {
    const { usePauseName: PauseName } = useSVGs();
    const wrapper = shallow(<PauseName />);

    expect(wrapper).toHaveLength(1);
  });
  test("GameOverLogo", () => {
    const { useGameOverLogo: GameOverLogo } = useSVGs();
    const wrapper = shallow(<GameOverLogo />);

    expect(wrapper).toHaveLength(1);
  });
  test("SubHeaderIcon", () => {
    const { useSubHeaderIcon: SubHeaderIcon } = useSVGs();
    const wrapper = shallow(<SubHeaderIcon />);

    expect(wrapper).toHaveLength(1);
  });
  test("HeaderIcon", () => {
    const { useHeaderIcon: HeaderIcon } = useSVGs();
    const wrapper = shallow(<HeaderIcon />);

    expect(wrapper).toHaveLength(1);
  });
  test("SettingsIcon", () => {
    const { useSettingsIcon: SettingsIcon } = useSVGs();
    const wrapper = shallow(<SettingsIcon />);

    expect(wrapper).toHaveLength(1);
  });
  test("DecipherCodeLogo", () => {
    const { useDecipherCodeLogo: DecipherCodeLogo } = useSVGs();
    const wrapper = shallow(<DecipherCodeLogo />);

    expect(wrapper).toHaveLength(1);
  });
  test("ColorWheelLogo", () => {
    const { useColorWheelLogo: ColorWheelLogo } = useSVGs();
    const wrapper = shallow(<ColorWheelLogo />);

    expect(wrapper).toHaveLength(1);
  });
  test("SwatchIcon", () => {
    const { useSwatchIcon: SwatchIcon } = useSVGs();
    const wrapper = shallow(<SwatchIcon />);

    expect(wrapper).toHaveLength(1);
  });
  test("LevelIcon", () => {
    const { useLevelIcon: LevelIcon } = useSVGs();
    const wrapper = shallow(<LevelIcon />);

    expect(wrapper).toHaveLength(1);
  });
});
