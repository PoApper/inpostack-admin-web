import axios from 'axios'

export const getNotice = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/notice`, {withCredentials: true});
    return res.data;
  } catch (err) {
    alert(`공지 정보를 불러오는데 실패했습니다.\n`)
    throw err;
  }
}

export const createNotice = async ({ title, content, notice_type }) => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API}/notice`, {
      title: title,
      content: content,
      notice_type: notice_type
    }, {/*withCredentials: true*/}); // TODO: 
    window.location.reload();
  } catch (err) {
    throw err;
  }
}

export const updateNoticeInfo = async ({ title, content, notice_type, uuid }) => {
  try {
    await axios.put(`${process.env.NEXT_PUBLIC_API}/notice/${uuid}`, {
      title: title,
      content: content,
      notice_type: notice_type
    }, {/*withCredentials: true*/}); // TODO: 
  } catch (err) {
    throw err;
  }
}

export const deleteNoticeInfo = async ({ uuid }) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API}/notice/${uuid}`);
  } catch (err) {
    throw err;
  }
}

