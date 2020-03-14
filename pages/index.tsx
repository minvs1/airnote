import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { useSnackbar } from 'notistack'
import nanoid from 'nanoid'
import aesjs from 'aes-js'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

import SecretSettings from '../components/SecretSettings'
import SecretLink from '../components/SecretLink'

// TODO: add babel improt plugin - https://material-ui.com/guides/minimizing-bundle-size/
// TODO: Clean this component

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
  secretWrapper: {
    [theme.breakpoints.down('xs')]: {
      height: '100%',
    },
    position: 'relative',
  },
  secretSettings: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    zIndex: theme.zIndex.speedDial,
    fontSize: '1.2rem',
  },
  submitWrapper: {
    position: 'relative',
    marginTop: theme.spacing(2),
  },
  submitButton: {
    width: '100%',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

const initialSecretData = {
  secret: '',
}

interface Props {
  uuid: string
}

const encryptSecret = (secret: string, password: string): string => {
  const key = aesjs.utils.utf8.toBytes(password)
  const secretBytes = aesjs.utils.utf8.toBytes(secret)
  const aesCtr = new aesjs.ModeOfOperation.ctr(key)
  const encryptedBytes = aesCtr.encrypt(secretBytes)

  return aesjs.utils.hex.fromBytes(encryptedBytes)
}

const Home = () => {
  const [secretData, setSecretData] = useState(initialSecretData)
  const [submitting, setSubmitting] = useState(false)
  const [secretLink, setSecretLink] = useState<string | null>(null)
  const [settings, setSettings] = useState({
    selfDestruct: 'after-read',
  })
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const submit = async () => {
    if (submitting || !secretData.secret || secretData.secret === '') {
      return
    }

    setSubmitting(true)

    const password = nanoid(16)

    const encryptedSecret = encryptSecret(secretData.secret, password)

    try {
      const response = await fetch('/api/secrets', {
        method: 'POST',
        body: JSON.stringify({
          encrypted_secret: encryptedSecret,
          settings,
        }),
      })

      const data = await response.json()

      setSecretLink(`${window.location.origin}/${data.id}#${password}`)
    } catch {
      enqueueSnackbar('Failed to save your secret. Please try again later...', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      })
    }

    setSubmitting(false)
  }

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm" className={classes.container}>
        <div className={classes.secretWrapper}>
          <SecretSettings
            className={classes.secretSettings}
            settings={settings}
            setSettings={setSettings}
          />

          <TextField
            autoComplete="false"
            className={classes.unencryptedSecret}
            label="Tell me a secret..."
            multiline
            value={secretData.secret}
            rows="8"
            margin="normal"
            variant="outlined"
            fullWidth
            InputProps={{
              className: classes.unencryptedSecretInput,
            }}
            inputProps={{
              autocorrect: 'off',
              autocapitalize: 'off',
              spellcheck: 'false',
              'data-gramm': 'false',
              style: { height: '100%' },
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSecretData({ ...secretData, secret: event.target.value })
            }
          />
        </div>

        <div className={classes.submitWrapper}>
          <Button
            className={classes.submitButton}
            color="secondary"
            onClick={submit}
            disabled={submitting}
          >
            {'Share it!'}
          </Button>

          {submitting && (
            <CircularProgress
              color="secondary"
              size={24}
              className={classes.buttonProgress}
            />
          )}
        </div>
      </Container>

      <SecretLink link={secretLink} onClose={() => setSecretLink(null)} />
    </Box>
  )
}

export default Home
