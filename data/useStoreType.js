import useSWR from 'swr';
import axios from 'axios';

const useStoreMetaType = () => {
  const reqUrl = `${process.env.NEXT_PUBLIC_API}/store/meta`;
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, mutate, error } = useSWR(reqUrl, fetcher);

  const loading = !data && !error;

  return {
    loading,
    storeMetaType: loading ? {} : data.store_type,
    mutate,
  };
};

export default useStoreMetaType;
