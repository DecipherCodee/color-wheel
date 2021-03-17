import { shallow } from "enzyme";
import { useLayout } from "..";

describe("useLayout", () => {
  let wrapper;

  test("useHeader", () => {
    const { useHeader: Header } = useLayout();
    wrapper = shallow(<Header />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
  test("useFooter", () => {
    const { useFooter: Footer } = useLayout();
    wrapper = shallow(<Footer />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
