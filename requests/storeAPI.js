import axios from 'axios'

export const getStore = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/store`, {withCredentials: true});
    return res.data;
  } catch (err) {
    throw err;
  }
}

export const CreateStore = async ({ name, phone, description, store_type, address1, address2, zipcode, open_time, close_time, image_url, /*owner_uuid*/ }) => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API}/store`, 
    {
      name: name,
      phone: phone,
      description: description,
      store_type: store_type,
      address1: address1,
      address2: address2,
      zipcode: zipcode,
      open_time: open_time,
      close_time: close_time,
      image_url: image_url,
      //owner_uuid: owner_uuid // TODO: it can be null - // uuid of owner account (it can be null)
    }, {withCredentials: true});
    window.location.reload();
  } catch (err) {
    alert('가게 생성 API 오류!')
    alert(err);
    console.log(err);
  }
}

export const updateStore = async ({ uuid, name, phone, description, store_type, address1, address2, zipcode, open_time, close_time, image_url, /*owner_uuid*/ }) => {
  try {
    await axios.put(`${process.env.NEXT_PUBLIC_API}/store/${uuid}`, 
    {
      name: name,
      phone: phone,
      description: description,
      store_type: store_type,
      address1: address1,
      address2: address2,
      zipcode: zipcode,
      open_time: open_time,
      close_time: close_time,
      image_url: image_url,
      //owner_uuid: owner_uuid // TODO: it can be null - // uuid of owner account (it can be null)
    }, {withCredentials: true});
    window.location.reload();
  } catch (err) {
    alert('가게 수정 API 오류!')
    console.log(err);
  }
}

export const deleteStore = async ({ uuid }) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API}/store/${uuid}`, {withCredentials: true});
  } catch (err) {
    throw err;
  }
}