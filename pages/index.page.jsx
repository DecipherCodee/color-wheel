import { useStore } from "./utils";

export function useHome() {
  const { View } = useStore();

  return <View />;
}

export default useHome;
