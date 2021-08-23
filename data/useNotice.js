import useSWR from "swr";
import { getNotice, getNoticeMeta } from "../requests/noticeAPI";

const useNotices = () => {
  const { data, mutate, error } = useSWR('api_notice', getNotice);
  const isLoaded = !(!data && !error);

  return {
    isLoaded,
    notices: data,
    mutate
  };
}

export default useNotices