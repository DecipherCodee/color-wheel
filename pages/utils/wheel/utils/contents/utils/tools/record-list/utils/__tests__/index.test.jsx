import { shallow } from "enzyme";
import { useRecordList } from "../..";
import { useProps } from "..";

describe("useRecordList", () => {
  describe("renders", () => {
    const RecordList = useRecordList;

    it("without record field", () => {
      const { putColors } = useProps();
      putColors({ colors: { blue: {} } });
      const wrapper = shallow(<RecordList />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
    it("with record field", () => {
      const { putColors } = useProps();
      putColors({ colors: { blue: { record: "0:12" } } });
      const wrapper = shallow(<RecordList />);
      const li = wrapper.find("li");
      expect(li.isEmptyRender()).toBeFalsy();
    });
  });
});
