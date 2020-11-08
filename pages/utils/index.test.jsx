import { shallow } from "enzyme";
import { useApp } from "../_app.page";

const props = { Component: jest.fn(), pageProps: {} };

describe("app", () => {
  let wrapper;
  let app;
  const { Component, pageProps } = props;

  const App = () => useApp({ Component, pageProps });

  beforeEach(() => {
    wrapper = shallow(<App />);
    app = wrapper.find("#app");
  });

  test("should render", () => {
    expect(app).toHaveLength(1);
  });
});
