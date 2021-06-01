import { Line, Bar } from 'react-chartjs-2'

const Charts = ({ lineData, line, country, barData }) => {
  const lineCharts = lineData ? (
    <Line
      data={{
        labels: lineData.map(({ Date }) => Date.substring(0, 10)),
        datasets: [
          {
            data: lineData.map(({ Confirmed }) => Confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          },
          {
            data: lineData.map(({ Deaths }) => Deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255,0,0,0.5)',
            fill: true,
          },
          {
            data: lineData.map(({ Recovered }) => Recovered),
            label: 'Recovered',
            borderColor: 'green',
            backgroundColor: 'rgba(0,255,0,0.3)',
            fill: true,
          },
        ],
      }}
    />
  ) : null

  const barChart = barData ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths', 'Active'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
              'rgba(242, 234, 0, 0.5)',
            ],
            hoverBackgroundColor: [
              'rgba(0, 77, 153)',
              'rgba(30, 102, 49)',
              'rgba(255, 51, 51)',
              'rgba(204, 153, 0)',
            ],
            data: [
              barData.TotalConfirmed,
              barData.TotalRecovered,
              barData.TotalDeaths,
              barData.TotalConfirmed -
                (barData.TotalRecovered + barData.TotalDeaths),
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null

  return <div>{line ? lineCharts : barChart}</div>
}

export default Charts
