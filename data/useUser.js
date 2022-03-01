import useSWR from 'swr';
import axios from 'axios';

const useUser = () => {
  const reqUrl = `${process.env.NEXT_PUBLIC_API}/auth/verifyToken`;
  const fetcher = (url) =>
    axios.get(url, { withCredentials: true }).then((res) => res.data);
  const { data, mutate, error } = useSWR(reqUrl, fetcher);

  const loading = !data && !error;
  const isLogout = data && Object.keys(data).length === 0;

  return {
    loading,
    user: loading ? {} : data,
    isLogout,
    mutate,
  };
};

export default useUser;
