import useSWR from 'swr'

import { getUser } from '../requests/userAPI'

const useUser = () => {
  const { data, mutate, error } = useSWR('api_user', getUser)

  const loading = !data && !error
  const loggedIn = data && !error

  return {
    loading,
    loggedIn,
    user: data,
    mutate,
  };
}

export default useUser