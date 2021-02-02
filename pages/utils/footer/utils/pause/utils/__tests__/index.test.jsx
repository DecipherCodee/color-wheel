import { shallow } from "enzyme";
import { usePause } from "../..";

describe("usePause", () => {
  it("renders", () => {
    function Pause() {
      return usePause();
    }
    const wrapper = shallow(<Pause />);
    expect(wrapper).toHaveLength(1);
  });
});
