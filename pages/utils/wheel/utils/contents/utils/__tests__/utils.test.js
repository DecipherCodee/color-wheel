import { shallow } from "enzyme";
import { useStore, useProps, checkAllUnfocused } from "..";

describe("utils", () => {
  let useEffect;
  // let unmount;
  // let callback;
  let wrapper;

  // function mockUnmount() {
  //   return unmount.mockImplementationOnce((f) => {
  //     callback = f();
  //     callback();
  //   });
  // }
  function mockEffect() {
    return useEffect.mockImplementationOnce((f) => f());
  }

  const Store = useStore;

  afterEach(() => shallow(<Store />));

  test("calls useStore", () => {
    useEffect = jest.spyOn(React, "useEffect");
    // unmount = jest.spyOn(React, "useEffect");

    const { putAllUnfocused } = useProps();
    putAllUnfocused({
      onAllFocused() {
        return true;
      },
    });

    // mockUnmount();
    mockEffect();

    wrapper = shallow(<Store />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  describe("put", () => {
    describe("restart", () => {
      const { putRestart } = useProps();

      test("returns", () => {
        const onRestart = jest.fn();
        const result = putRestart({ onRestart });
        expect(result).toBeUndefined();
        const result2 = putRestart({ onRestart });
        expect(result2).toBeNull();
      });
    });
    describe("quit", () => {
      const { putQuit } = useProps();

      test("returns", () => {
        const onQuit = jest.fn();
        const result = putQuit({ onQuit });
        expect(result).toBeUndefined();
        const result2 = putQuit({ onQuit });
        expect(result2).toBeNull();
      });
    });
    describe("allUnFocused", () => {
      const { putAllUnfocused } = useProps();

      test("returns", () => {
        const onAllFocused = jest.fn();
        const result = putAllUnfocused({ onAllFocused });
        expect(result).toBeUndefined();
        const result2 = putAllUnfocused({ onAllFocused });
        expect(result2).toBeNull();
      });
    });
    describe("tag", () => {
      const { putTag } = useProps();

      test("returns", () => {
        const onAllFocused = jest.fn();
        const result = putTag({ onAllFocused });
        expect(result).toBeUndefined();
        const result2 = putTag({ onAllFocused });
        expect(result2).toBeNull();
      });
    });
  });
  describe("check", () => {
    describe("allUnfocused", () => {
      const { putAllUnfocused } = useProps();
      const setButtonTitle = jest.fn();

      test("calls setButtonTitle with 'Try again' if initAllUnfocused()", () => {
        putAllUnfocused({
          onAllFocused() {
            return true;
          },
        });
        checkAllUnfocused({ setButtonTitle });
        expect(setButtonTitle).toHaveBeenCalledWith("Try again");
      });
      test("calls setButtonTitle with 'Restart' if !initAllUnfocused()", () => {
        putAllUnfocused({
          onAllFocused() {
            return false;
          },
        });
        checkAllUnfocused({ setButtonTitle });
        expect(setButtonTitle).toHaveBeenCalledWith("Restart");
      });
    });
  });
});
