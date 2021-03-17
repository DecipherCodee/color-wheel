import { shallow } from "enzyme";
import { useApp } from "../../_app.page";

describe("app", () => {
  let wrapper;

  it("renders", () => {
    function App() {
      return useApp({ Component: jest.fn(), pageProps: {} });
    }
    wrapper = shallow(<App />).find("#app");

    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
