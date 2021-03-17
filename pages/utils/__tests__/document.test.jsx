import { shallow } from "enzyme";
import { App } from "../../_document.page";

describe("document", () => {
  it("renders", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  describe("getInitialProps", () => {
    test("returns an object", async () => {
      const ctx = { renderPage: jest.fn };
      const result = await App.getInitialProps(ctx);
      expect(result).toEqual({ html: undefined, head: undefined, styles: [] });
    });
  });
});
