import { Line, Bar, Doughnut } from 'react-chartjs-2'

const Charts = ({ lineData, line, country, doughnutData }) => {
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

  const doughnut = doughnutData ? (
    <Doughnut
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
            borderColor: [
              'rgba(0, 77, 153)',
              'rgba(30, 102, 49)',
              'rgba(255, 51, 51)',
              'rgba(204, 153, 0)',
            ],
            borderWidth: 1,
            data: [
              doughnutData.TotalConfirmed,
              doughnutData.TotalRecovered,
              doughnutData.TotalDeaths,
              doughnutData.TotalConfirmed -
                (doughnutData.TotalRecovered + doughnutData.TotalDeaths),
            ],
          },
        ],
      }}
    />
  ) : null

  return <div>{line ? lineCharts : doughnut}</div>
}

export default Charts
