import { shallow } from "enzyme";
import { useLists } from "..";

describe("useLists", () => {
  describe("returns", () => {
    let wrapper;

    it("useColorList", () => {
      const { useColorList: ColorList } = useLists();
      wrapper = shallow(<ColorList />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
    it("useRecordList", () => {
      const { useRecordList: RecordList } = useLists();
      wrapper = shallow(<RecordList />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
  });
});
