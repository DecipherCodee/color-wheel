import { shallow } from "enzyme";
import {
  useStore,
  usePanel1,
  usePanel2,
  useProps,
  useAppStore,
  usePractice,
  checkIndex,
} from "..";
import { useStore as TitleStore } from "../layout/header/utils/title/utils";

describe("utils", () => {
  let useEffect;
  let unmount;
  let callback;
  let wrapper;

  function mockUnmount() {
    return unmount.mockImplementationOnce((f) => {
      callback = f();
      callback();
    });
  }
  function mockEffect() {
    return useEffect.mockImplementationOnce((f) => f());
  }

  const Store = useStore;

  afterEach(() => shallow(<Store />));

  describe("calls", () => {
    test("useStore", () => {
      useEffect = jest.spyOn(React, "useEffect");
      unmount = jest.spyOn(React, "useEffect");

      shallow(<TitleStore />);

      mockUnmount();
      mockEffect();
      mockUnmount();
      mockEffect();

      mockEffect();

      wrapper = shallow(<Store />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
      const { putShow } = useProps();
      expect(typeof putShow).toEqual("function");
    });
    test("useAppStore", () => {
      const AppStore = useAppStore;
      wrapper = shallow(<AppStore />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
  });
  describe("on", () => {
    describe("animationEnd", () => {
      const { onAnimationEnd } = useProps();
      const putMount = jest.fn();

      test("does not call putMount if isShown", () => {
        onAnimationEnd({ isShown: true, putMount });
        expect(putMount).toHaveBeenCalledTimes(0);
      });
      test("calls putMount if isShown = false", () => {
        onAnimationEnd({ putMount });
        expect(putMount).toHaveBeenCalledWith(false);
      });
    });
  });
  describe("dynamic", () => {
    it("usePanel1", () => {
      const Panel1 = usePanel1;
      wrapper = shallow(<Panel1 />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
    it("usePanel2", () => {
      const Panel2 = usePanel2;
      wrapper = shallow(<Panel2 />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
    it("usePractice", () => {
      const Practice = usePractice;
      wrapper = shallow(<Practice />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
  });
  describe("check", () => {
    describe("mounted", () => {
      const { checkMounted } = useProps();
      const put = jest.fn();

      test("does not call put if isMounted = false", () => {
        checkMounted({ put });
        expect(put).toHaveBeenCalledTimes(0);
      });
      test("calls put if isMounted", () => {
        checkMounted({ isMounted: true, put });
        expect(put).toHaveBeenCalledWith(true);
      });
    });
    describe("index", () => {
      test("returns old if isFocused", () => {
        const old = 0;
        const result = checkIndex(
          {
            colors: { blue: { isFocused: true } },
            color: "blue",
            putColors: jest.fn(),
          },
          old
        );
        expect(result).toEqual(old);
      });

      describe("if !isFocused", () => {
        describe("returns old + 1", () => {
          test("without titleStore", () => {
            const old = 0;
            const result = checkIndex(
              {
                colors: { blue: { isFocused: false } },
                color: "blue",
                putColors: jest.fn(),
              },
              old
            );
            expect(result).toEqual(old + 1);
          });
          test("with titleStore", () => {
            const old = 0;
            const result = checkIndex(
              {
                colors: { blue: { isFocused: false } },
                color: "blue",
                putColors: jest.fn(),
                titleStore() {
                  return { initName: "name" };
                },
              },
              old
            );
            expect(result).toEqual(old + 1);
          });
        });
      });
    });
  });
  describe("findElement", () => {
    const { findElement } = useProps();
    const clientX = 34;
    const clientY = 4;
    const colors = { blue: { isFocus: false } };
    const putColors = jest.fn();
    const putIndex = jest.fn();
    const forEach = jest.fn();

    test("doesn't call nearestElements.forEach if !nearestElements.length > 0 && !Object.keys(colors).length > 0", () => {
      global.document = {
        elementsFromPoint() {
          return { length: 0, forEach };
        },
      };
      findElement({ clientX, clientY, colors: {}, putColors, putIndex });
      expect(forEach).toHaveBeenCalledTimes(0);
    });

    describe("if nearestElements.length > 0 && Object.keys(colors).length > 0", () => {
      test("calls nearestElements.forEach", () => {
        global.document = {
          elementsFromPoint() {
            return {
              length: 30,
              forEach,
            };
          },
        };
        findElement({ clientX, clientY, colors, putColors, putIndex });
        expect(forEach).toHaveBeenCalledTimes(1);

        const ele = {
          get() {
            return [
              {
                closest: jest.fn((value) => {
                  if (value === "blue") {
                    return true;
                  }
                  return false;
                }),
              },
            ];
          },
        };
        ele.get()[0].closest("value");
      });

      describe("element.closest()", () => {
        test("doesn't call putIndex if false", () => {
          global.document = {
            elementsFromPoint() {
              return [
                {
                  closest: jest.fn((value) => {
                    if (value === ".red") {
                      return true;
                    }
                    return false;
                  }),
                },
              ];
            },
          };
          findElement({
            clientX,
            clientY,
            colors,
            putColors,
            putIndex,
          });
          expect(putIndex).toHaveBeenCalledTimes(0);
        });
        test("calls putIndex if true", () => {
          global.document = {
            elementsFromPoint() {
              return [
                {
                  closest: jest.fn((value) => {
                    if (value === ".blue") {
                      return true;
                    }
                    return false;
                  }),
                },
              ];
            },
          };
          findElement({
            clientX,
            clientY,
            colors,
            putColors,
            putIndex,
          });
          expect(putIndex).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
  describe("isAllUnfocused", () => {
    test("returns boolean", () => {
      const { isAllUnfocused } = useProps();
      const result = isAllUnfocused({ colors: { blue: { isFocused: false } } });
      expect(typeof result).toEqual("string");
    });
  });
});
