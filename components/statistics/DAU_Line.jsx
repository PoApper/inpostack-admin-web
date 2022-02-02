import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ResponsiveLine } from '@nivo/line'
//for build
//import { Line } from 'react-chartjs-2'
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

  /*const data = {
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
  }*/

  const data = [{
    "id": "# of active user",
    "color": "hsl(77, 70%, 50%)",
    "data": DAUValue.map((row)=>{
      var returnObj = {}
      returnObj["Date"] = moment(row.login_date).format('YYYY-MM-DD')
      returnObj["# of users"] = row.daily_active_user
      return returnObj
    })
  }]

  return (
    <div>
      <h2>일일 활성 유저</h2>
      {/*<Line data={data}/>*/console.log(data)}
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Date',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '# of Active Users',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        enableGridY={false}
        colors={{ scheme: 'set1' }}
        lineWidth={4}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor', modifiers: [] }}
        pointLabel="x"
        pointLabelYOffset={-12}
        areaOpacity={0.1}
        enableCrosshair={false}
        useMesh={true}
        legends={[
            /*{
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 23,
                itemOpacity: 0.75,
                symbolSize: 13,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }*/
        ]}
        motionConfig="stiff"
      />
    </div>
  )

}

export default DAU_Line