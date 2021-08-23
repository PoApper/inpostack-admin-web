import useSWR from "swr";
import { getStore } from "../requests/storeAPI";

const useStore = () => {
  const { data, mutate, error } = useSWR('api_store', getStore);
  const isLoaded = !(!data && !error);

  return {
    isLoaded,
    stores: data,
    mutate
  };
}

export default useStore;