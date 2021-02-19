import { shallow } from "enzyme";
import { App } from "../../_document.page";

describe("_document.page.jsx", () => {
  it("should render", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toHaveLength(1);
  });

  describe("getInitialProps", () => {
    const ctx = {
      renderPage() {
        return jest.fn;
      },
    };

    test("returns an object", async () => {
      const result = await App.getInitialProps(ctx);

      expect(typeof result === "object").toBeTruthy();
      expect(result).toEqual({ html: undefined, head: undefined, styles: [] });
    });
  });
});
