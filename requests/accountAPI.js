import axios from 'axios'

export const getAccount = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/account`, {withCredentials: true});
    return res.data;
  } catch (err) {
    alert(`계정 정보를 불러오는데 실패했습니다.\n`);
    throw err;
  }
}

export const createAccount = async ({ sendMail, email, id, name, password, account_type }) => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/register?sendMail=${sendMail}`, {
      email: email,
      id: id,
      name: name,
      password: password,
      account_type: account_type
    }, {withCredentials: true});
    window.location.reload();
  } catch (err) {
    throw err;
  }
}

export const updateAccount = async ({ uuid, email, id, name, account_type, doesSendEmail }) => {
  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_API}/account/${uuid}?doesSendEmail=${doesSendEmail}`,
      {
        email: email,
        id: id,
        name: name,
        account_type: account_type
      }, {withCredentials: true});
    window.location.reload();
  } catch (err) {
    throw err;
  }
}

export const deleteAccount = async ({ uuid }) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API}/account/${uuid}`, {withCredentials: true});
  } catch (err) {
    throw err;
  }
}