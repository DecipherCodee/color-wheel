import { useStore } from "./utils";

export function use2() {
  const { page } = useStore();

  return <main className={page} />;
}
export default use2;
