import { shallow } from "enzyme";
import { usePause } from "../..";
import { useProps } from "..";

describe("usePause", () => {
  it("renders if isMounted", () => {
    const Pause = usePause;
    const wrapper = shallow(<Pause />);
    const { putMount } = useProps();
    putMount(true);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
