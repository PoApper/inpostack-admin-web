import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

const DAU_Line = () => {
  const [DAUValue, setDAUValue] = useState([])

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD')
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/statistics/daily_active_user?start_date=${'2021-08-01'}&end_date=${today}`)
      .then((res) => setDAUValue(res.data))
      .catch(() => alert('Daily Active User를 불러오는데 실패했습니다.'))
  }, [])

  const data = {
    labels: DAUValue.map(row => moment(row.login_date).format('YYYY-MM-DD')),
    datasets: [
      {
        label: '# of active user',
        data: DAUValue.map(row => row.daily_active_user),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }

  return (
    <div>
      <h2>일일 활성 유저</h2>
      <Line data={data}/>
    </div>
  )

}

export default DAU_Line