import { shallow } from "enzyme";
import {
  useSettingsStore,
  useStore,
  useRender,
  updateMounted,
  updateShown,
  checkMounted,
} from "..";

describe("utils", () => {
  describe("useStore", () => {
    it("returns an object", () => {
      function Store() {
        return useStore();
      }
      const wrapper = shallow(<Store />);
      expect(wrapper).toHaveLength(1);
    });
  });

  describe("useRender", () => {
    it("renders", () => {
      const { putMount } = useSettingsStore();
      putMount(true);
      function Render() {
        return useRender();
      }
      const wrapper = shallow(<Render />);
      expect(wrapper).toHaveLength(1);
    });
  });

  describe("update", () => {
    test("isMounted", () => {
      updateMounted({ isMounted: true });
      const { initMounted } = useSettingsStore();
      expect(initMounted).toBeTruthy();
    });
    test("isShown", () => {
      updateShown({ isShown: true });
      const { initShown } = useSettingsStore();
      expect(initShown).toBeTruthy();
    });
  });

  describe("checkMounted", () => {
    test("returns undefined if isMounted = false", () => {
      const { putMount, putShow } = useSettingsStore();
      putMount(false);
      putShow(false);

      checkMounted();

      const { initMounted, initShown } = useSettingsStore();
      expect(initMounted).toBeFalsy();
      expect(initShown).toBeFalsy();
    });
    test("sets isShow = true if isMounted = true", () => {
      const { putMount, putShow } = useSettingsStore();
      putMount(true);
      putShow(false);

      checkMounted();

      const { initMounted, initShown } = useSettingsStore();
      expect(initMounted).toBeTruthy();
      expect(initShown).toBeTruthy();
    });
  });
});
