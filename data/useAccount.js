import useSWR from "swr";
import { getAccount } from "../requests/accountAPI";

const useAccount = () => {
  const { data, mutate, error } = useSWR('api_account', getAccount);
  const isLoaded = !(!data && !error);

  return {
    isLoaded,
    accounts: data,
    mutate
  };
}

export default useAccount;