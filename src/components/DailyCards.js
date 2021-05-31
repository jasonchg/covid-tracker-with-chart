import {
  Grid,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core'

import CountUp from 'react-countup'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: 25,
  },
  card: {
    margin: 10,
    padding: 10,
    width: 275,
    textAlign: 'start',
    marginBottom: 7,
  },
  cookies: {
    background: '#eee',
    padding: 7,
    borderRadius: 10,
    marginTop: 7,
    width: '50%',
  },
})

const Cards = ({ data, country }) => {
  const classes = useStyles()

  return !data ? (
    'Loading... '
  ) : (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item>
            <Card variant='outlined' className={classes.card}>
              <CardContent>
                <Typography color='textSecondary' gutterBottom>
                  Total Confirmed
                </Typography>
                <Typography variant='h4' component='h2'>
                  <CountUp start={0} end={data.TotalConfirmed} duration={2} />
                </Typography>
                {!country && (
                  <Typography variant='subtitle1' className={classes.cookies}>
                    + {data.NewConfirmed}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card variant='outlined' className={classes.card}>
              <CardContent>
                <Typography color='textSecondary' gutterBottom>
                  Total Deaths
                </Typography>
                <Typography variant='h4' component='h2'>
                  <CountUp start={0} end={data.TotalDeaths} duration={2} />
                </Typography>
                {!country && (
                  <Typography variant='subtitle1' className={classes.cookies}>
                    + {data.NewDeaths}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card variant='outlined' className={classes.card}>
              <CardContent>
                <Typography color='textSecondary' gutterBottom>
                  Total Recovered
                </Typography>
                <Typography variant='h4' component='h2'>
                  <CountUp start={0} end={data.TotalRecovered} duration={2} />
                </Typography>
                {!country && (
                  <Typography variant='subtitle1' className={classes.cookies}>
                    + {data.NewRecovered}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Cards
