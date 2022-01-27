import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ResponsiveLine } from '@nivo/line'
import moment from 'moment'

const DRU_Line = () => {
  const [DRUValue, setDRUValue] = useState([])

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD')
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/statistics/daily_register_user?start_date=${'2021-08-01'}&end_date=${today}`)
      .then((res) => setDRUValue(res.data))
      .catch(() => alert('Daily Register User를 불러오는데 실패했습니다.'))
  }, [])

  const data = {
    labels: DRUValue.map(row => moment(row.register_date).format('YYYY-MM-DD')),
    datasets: [
      {
        label: '# of register user',
        data: DRUValue.map(row => row.daily_register_user),
      },
    ],
  }

  return (
    <div>
      <h2>일일 가입 유저</h2>
      <div style={{height: '500px'}}>
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
              legend: 'transportation',
              legendOffset: 36,
              legendPosition: 'middle'
          }}
          axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'count',
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
              {
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
              }
          ]}
          motionConfig="stiff"
      />
    </div>
    </div>
  )

}

export default DRU_Line