import { useEffect, useState } from 'react'
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  makeStyles,
  Select,
  FormControl,
} from '@material-ui/core'
import DailyCards from './components/DailyCards'
import Charts from './components/Charts'

const useStyles = makeStyles({
  root: {},
  sideBarLeft: {
    height: '100vh',
    paddingTop: 20,
  },
  sideBarRight: {
    height: '100vh',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 7,
  },
  formControl: {
    marginTop: 20,
  },
  charts: {
    margin: 20,
  },
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
      <AppBar position='static' color='secondary'>
        <Toolbar>
          <Typography variant='h6'>JCP | Covid 19 Tracker</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.root}>
        <Grid container>
          <Grid item xs={3}>
            <div className={classes.sideBarLeft}>
              <Typography variant='h5' className={classes.title}>
                Global Overview
              </Typography>

              <Typography color='textSecondary'>
                <span>Last Updated At: {data.Date.substring(0, 10)}</span>
              </Typography>
              <DailyCards data={data.Global} />
            </div>
          </Grid>
          <Grid item xs={9} className={classes.sideBarRight}>
            <FormControl className={classes.formControl}>
              <Typography>Select by country</Typography>
              <Select
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
              </Select>
              <DailyCards data={selectedCountrySummary} country />
            </FormControl>

            <div className={classes.charts}>
              <Charts
                line
                country={selectedCountry}
                lineData={selectedCountryAllResult}
                barData={selectedCountrySummary}
              />
            </div>
            <div className={classes.charts}>
              <Charts
                country={selectedCountry}
                barData={selectedCountrySummary}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default App
