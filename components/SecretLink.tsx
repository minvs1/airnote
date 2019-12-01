import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
} from '@material-ui/core'

import FileCopyIcon from '@material-ui/icons/FileCopy'
import DoneIcon from '@material-ui/icons/Done'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

type Props = {
  link: string | null
  onClose: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      marginRight: theme.spacing(1),
      fontSize: '0.8rem',
    },
  })
)

const SecretLink = ({ link, onClose }: Props) => {
  const [copied, setCopied] = React.useState(false)
  const classes = useStyles()
  const secretInputRef = React.useRef<HTMLInputElement>(null)

  const copySecretLink = () => {
    const inputEl = secretInputRef.current

    if (inputEl) {
      inputEl.select()

      document.execCommand('copy')

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  return (
    <Dialog
      open={!!link}
      onClose={onClose}
      aria-labelledby="secret-link-dialog"
      aria-describedby="secret-link-description"
    >
      <DialogTitle id="secret-link-dialog">
        {'Your secret is safe!'}
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="secret-link-description">
          {
            'The secret was encrypted with a password that is displayed only to you for a single time.'
          }
        </DialogContentText>

        {link && (
          <TextField
            className={classes.link}
            label="Your Secret Link"
            value={link}
            margin="normal"
            variant="outlined"
            inputRef={secretInputRef}
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: document.queryCommandSupported('copy') && (
                <InputAdornment position="end">
                  {copied ? (
                    <Tooltip title="Copied!">
                      <DoneIcon fontSize="small" color="secondary" />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Copy">
                      <IconButton
                        aria-label="copy"
                        size="small"
                        onClick={copySecretLink}
                      >
                        <FileCopyIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  )}
                </InputAdornment>
              ),
            }}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          {'Close'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SecretLink
