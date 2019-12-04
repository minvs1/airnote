import React from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import aesjs from 'aes-js'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Container,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

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
  secret: {
    margin: 0,
    [theme.breakpoints.down('xs')]: {
      flex: 1,
      height: '100%',
    },
  },
  secretInput: {
    [theme.breakpoints.down('xs')]: {
      height: '100%',
    },
  },
  submitWrapper: {
    position: 'relative',
    marginTop: theme.spacing(2),
  },
  tellAnotherWrapper: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    width: '100%',
  },
  tellAnotherButtonLabel: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

const decryptSecret = (encryptedSecret: string, password: string): string => {
  const key = aesjs.utils.utf8.toBytes(password)
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedSecret)
  const aesCtr = new aesjs.ModeOfOperation.ctr(key)
  const decryptedBytes = aesCtr.decrypt(encryptedBytes)

  return aesjs.utils.utf8.fromBytes(decryptedBytes)
}

const ViewSecret: NextPage<{ id: string }> = ({ id }) => {
  const [loading, setLoading] = React.useState(false)
  const [secret, setSecret] = React.useState<string | null>(null)
  const classes = useStyles()

  const showSecret = async () => {
    setLoading(true)
    // TODO: add loading and label Decrypting...
    try {
      const res = await fetch(`/api/secrets/${id}`, {
        method: 'DELETE',
      })

      const { encryptedSecret } = await res.json()

      // TODO: check if hash exists
      const key = window.location.hash.substring(1)

      setSecret(decryptSecret(encryptedSecret, key))
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm" className={classes.container}>
        {secret && (
          <div className={classes.tellAnotherWrapper}>
            <Button
              classes={{
                root: classes.submitButton,
                label: classes.tellAnotherButtonLabel,
              }}
              variant="outlined"
              color="primary"
              onClick={() => Router.push('/')}
            >
              <ArrowBackIosIcon />
              {'Tell another'}
              <span />
            </Button>
          </div>
        )}

        <TextField
          className={classes.secret}
          multiline
          label={loading ? 'Decrypting...' : 'Your secret'}
          value={secret || `Your secret ${id} is hidden`}
          margin="normal"
          variant="outlined"
          fullWidth
          InputProps={{ readOnly: true, className: classes.secretInput }}
          inputProps={{ style: { height: '100%' } }}
          rows={8}
        />

        {!secret && (
          <div className={classes.submitWrapper}>
            <Button
              className={classes.submitButton}
              onClick={showSecret}
              disabled={loading}
              variant="outlined"
              color="secondary"
            >
              {'Reveal!'}
            </Button>

            {loading && (
              <CircularProgress
                color="secondary"
                size={24}
                className={classes.buttonProgress}
              />
            )}
          </div>
        )}
      </Container>
    </Box>
  )
}

ViewSecret.getInitialProps = async ({ req, query }) => {
  // let protocol = 'https:'
  // let host = req ? req.headers.host : window.location.hostname

  // if (host && host.match(/(127\.0\.0\.1|localhost)/)) {
  //   protocol = 'http:'
  // }

  // const res = await fetch(`${protocol}//${host}/api/secrets/${query.id}`)

  // const secret = await res.json()

  // console.log(secret)

  return { id: query.id.toString() }
}

export default ViewSecret
