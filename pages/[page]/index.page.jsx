import { usePageStore } from "./utils";

export const usePage = () => {
  const { styles } = usePageStore();

  return <main className={styles.page}>Page</main>;
};

export default usePage;
