import axios from 'axios'

export const login = async ({ id, password }) => {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
    id, password,
  }, { withCredentials: true })
  return res.data
}

export const getUser = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/auth/me`, { withCredentials: true })
    const user = res.data
    if (user.account_type !== 'ADMIN') throw Error('Not Admin')
    return user;
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const logout = async () => {
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_API}/auth/logout`,
      { withCredentials: true })
  } catch (err) {
    throw err
  }
}