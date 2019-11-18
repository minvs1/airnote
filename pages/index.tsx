import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  '@global': {
    'html, body, #__next': {
      width: '100%',
      height: '100%',
    },
  },
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 0),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      height: '100%',
    },
  },
  unencryptedSecret: {
    margin: 0,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      flex: 1,
      height: '100%',
    },
  },
  unencryptedSecretInput: {
    [theme.breakpoints.down('xs')]: {
      height: '100%',
    },
  },
}))

const Home = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm" className={classes.container}>
        <TextField
          className={classes.unencryptedSecret}
          label="Tell me a secret..."
          multiline
          rows="8"
          margin="normal"
          variant="outlined"
          fullWidth
          InputProps={{ className: classes.unencryptedSecretInput }}
          inputProps={{ style: { height: '100%' } }}
        />

        <Button color="secondary">{'Share it!'}</Button>
      </Container>
    </Box>
  )
}

export default Home
