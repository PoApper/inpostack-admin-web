import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

const DRU_Line = () => {
  const [DRU_data, setDRU_data] = useState([])

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD')
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/statistics/daily_register_user?start_date=${'2021-08-01'}&end_date=${today}`)
      .then((res) => setDRU_data(res.data))
      .catch(() => alert('Daily Register User를 불러오는데 실패했습니다.'))
  }, [])

  const data = {
    labels: DRU_data.map(row => row.register_date),
    datasets: [
      {
        label: '# of register user',
        data: DRU_data.map(row => row.daily_register_user),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }

  return (
    <div>
      <h2>일일 가입 유저</h2>
      <Line data={data}/>
    </div>
  )

}

export default DRU_Line