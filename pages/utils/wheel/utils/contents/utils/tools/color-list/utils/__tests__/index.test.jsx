import { shallow } from "enzyme";
import { useColorList } from "../..";
import { useProps } from "..";

describe("useColorList", () => {
  it("renders", () => {
    const ColorList = useColorList;
    const { putColors } = useProps();
    putColors({ colors: { blue: {} } });

    const wrapper = shallow(<ColorList />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
