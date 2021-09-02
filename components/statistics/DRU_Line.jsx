import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

const DRU_Line = () => {
  const [DRU_data, setDRU_data] = useState([])

  useEffect(async () => {
    try {
      const today = moment().format('YYYY-MM-DD')
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/statistics/DRU?start_date=${'2021-08-01'}&end_date=${today}`);
      setDRU_data(res.data);
    } catch (err) {
      alert("통계 데이터를 불러오는데 실패했습니다.")
    }
  }, [])

  const data = {
    labels: DRU_data.map(row => row.register_date),
    datasets: [
      {
        label: '# of register user',
        data: DRU_data.map(row => row.DRU),
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