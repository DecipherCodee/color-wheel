import { shallow } from "enzyme";
import { useContents } from "../..";
import { useProps } from "..";
import {
  useStore as TitleStore,
  useProps as useTitleProps,
} from "../../../../../layout/header/utils/title/utils";

describe("useContents", () => {
  const Contents = useContents;

  beforeEach(() => shallow(<TitleStore />));

  describe("header", () => {
    describe("renders", () => {
      it("'Game Over' if name === ('0:00' || 'Practice')", () => {
        const { putName } = useTitleProps();
        putName("0:00");

        const header = shallow(<Contents />)
          .find("header")
          .at(0);

        expect(header.text()).toEqual("Game Over");
      });
      it("'Paused' if name !== ('0:00' || 'Practice')", () => {
        const { putName } = useTitleProps();
        putName("0:20");

        const header = shallow(<Contents />)
          .find("header")
          .at(0);

        expect(header.text()).toEqual("Paused");
      });
    });
  });
  describe("renders ColorList", () => {
    const { putTag } = useProps();

    test("if tag = 'level'", () => {
      const wrapper = shallow(<Contents />).find(`[test="level-color-list"]`);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
    test("if tag != 'level'", () => {
      putTag({ tag: "practice" });
      const wrapper = shallow(<Contents />).find(
        `[test="practice-color-list"]`
      );
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
  });
});
