import { shallow } from "enzyme";
import {
  useLevel1,
  unmount,
  useStore,
  useLevels,
  initialiseIndex,
  useGStore,
  initialiseView,
  useAppStore,
} from "..";

describe("useStore", () => {
  it("renders", () => {
    function Store() {
      return useStore();
    }
    const wrapper = shallow(<Store />);
    expect(wrapper).toHaveLength(1);
  });

  describe("dynamic", () => {
    it("imports useLevel1", () => {
      const Level1 = useLevel1;
      const wrapper = shallow(<Level1 />);
      expect(wrapper).toHaveLength(1);
    });
    it("imports useLevels", () => {
      const Levels = useLevels;
      const wrapper = shallow(<Levels />);
      expect(wrapper).toHaveLength(1);
    });
  });

  describe("unmount", () => {
    const set = jest.fn();
    const value = false;

    test("calls set using value", () => {
      unmount({ set, value });

      expect(set).toHaveBeenCalledTimes(1);
      expect(set).toHaveBeenCalledWith(value);
    });
  });

  describe("initialise", () => {
    test("index", () => {
      const index = 0;
      initialiseIndex({ index });
      const { initIndex } = useGStore();

      expect(initIndex).toEqual(index);
    });
    test("view", () => {
      const view = "home";
      initialiseView({ view });
      const { initView } = useGStore();

      expect(initView).toEqual(view);
    });
  });
});

describe("useAppStore", () => {
  test("returns an object", () => {
    const result = useAppStore();
    expect(typeof result === "object").toBeTruthy();
  });
});
