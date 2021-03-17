import { shallow } from "enzyme";
import { usePractice } from "../..";
import { useProps } from "..";

describe("usePractice", () => {
  it("renders if isMounted", () => {
    const Practice = usePractice;
    const wrapper = shallow(<Practice />);
    const { putMount } = useProps();
    putMount(true);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
