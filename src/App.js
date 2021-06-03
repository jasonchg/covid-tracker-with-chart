import { useEffect, useState } from 'react'
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  makeStyles,
  FormControl,
} from '@material-ui/core'
import DailyCards from './components/DailyCards'
import Charts from './components/Charts'

const useStyles = makeStyles({
  root: {
    padding: 10,
  },
  appBar: {
    background: '#3700b3',
  },
  sideBarLeft: {
    paddingTop: 20,
  },
  selectCountry: {
    width: '100%',
    padding: 15,
    margin: 10,
    fontWeight: 'bold',
    outline: 'none',
    border: 'none',
    borderBottom: '1px solid #eee',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 7,
    color: '#fff',
  },
  subtitle: {
    color: '#fff',
  },
  formControl: {
    marginTop: 20,
  },
  chartContainer: {
    marginTop: 50,
    width: '100%',
    padding: 10,
    border: '1px solid #e0e0e0',
    borderRadius: 10,
  },
  lineChart: {
    padding: 15,
  },
  pieChart: { padding: 15 },
})

function App() {
  const classes = useStyles()
  const [data, setData] = useState(null)
  const [countries, setCountries] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState('singapore')
  const [selectedCountrySummary, setSelectedCountrySummary] = useState(null)
  const [selectedCountryAllResult, setSelectedCountryAllResult] = useState(null)

  useEffect(() => {
    const url = 'https://api.covid19api.com'

    // Get Daily Summary
    const getDailyCovidSummary = async () => {
      try {
        return await fetch(`${url}/summary`)
          .then((res) => res.json())
          .then((result) => setData(result))
      } catch (error) {
        console.error(error)
      }
    }

    // Get Countries
    const getCountries = async () => {
      try {
        return await fetch(`${url}/countries`)
          .then((res) => res.json())
          .then((result) => setCountries(result))
      } catch (error) {
        console.error(error)
      }
    }

    // Get Selected Country Stats
    const getSelectedCountry = async () => {
      try {
        return await fetch(`${url}/total/dayone/country/${selectedCountry}`)
          .then((res) => res.json())
          .then((result) => {
            setSelectedCountryAllResult(result)
            setSelectedCountrySummary({
              TotalConfirmed: result.reduce(
                (total, curr) => total + curr.Confirmed,
                0
              ),
              TotalDeaths: result.reduce(
                (total, curr) => total + curr.Deaths,
                0
              ),
              TotalRecovered: result.reduce(
                (total, curr) => total + curr.Recovered,
                0
              ),
            })
          })
      } catch (error) {
        console.error(error)
      }
    }
    getDailyCovidSummary()
    getCountries()

    if (selectedCountry !== '') {
      getSelectedCountry()
    }
  }, [selectedCountry])

  return !data || !countries ? (
    'Loading...'
  ) : (
    <>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6'>JCP | Covid 19 Tracker</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.root}>
        <Grid container>
          <Grid item lg={3}>
            <div className={classes.sideBarLeft}>
              <Typography variant='h5' className={classes.title}>
                Global Overview
              </Typography>
              <Typography className={classes.subtitle}>
                <span>Last Updated At: {data.Date.substring(0, 10)}</span>
              </Typography>
              <DailyCards data={data.Global} />
            </div>
          </Grid>
          <Grid item lg={9} className={classes.sideBarRight}>
            <FormControl className={classes.formControl}>
              <Typography>Select by country</Typography>
              <select
                className={classes.selectCountry}
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {countries.length !== 0
                  ? countries.map((country) => (
                      <option key={country.Slug} value={country.Slug}>
                        {country.Country}
                      </option>
                    ))
                  : ''}
              </select>
              <DailyCards data={selectedCountrySummary} country />
            </FormControl>

            <Grid container className={classes.chartContainer}>
              <Grid item xs={12} md={8} className={classes.lineChart}>
                <Charts
                  line
                  country={selectedCountry}
                  lineData={selectedCountryAllResult}
                />
              </Grid>

              <Grid item xs={12} md={4} className={classes.pieChart}>
                <Charts
                  country={selectedCountry}
                  pieData={selectedCountrySummary}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default App
