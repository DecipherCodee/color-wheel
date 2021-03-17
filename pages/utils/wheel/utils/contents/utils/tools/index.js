import dynamic from "next/dynamic";

const useColorList = dynamic(() =>
  import("./color-list").then((mod) => mod.useColorList)
);
const useRecordList = dynamic(() =>
  import("./record-list").then((mod) => mod.useRecordList)
);

export function useLists() {
  return { useColorList, useRecordList };
}
