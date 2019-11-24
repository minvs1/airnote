import { useState } from 'react'
import { Typography, Link } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

interface Props {
  className: string
}

const useStyles = makeStyles(theme => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    fontSize: '0.675rem',
    color: 'rgba(255, 255, 255, 0.4)',
    position: 'absolute',
    bottom: -4,
  },
  footerLinksWrapper: {
    position: 'fixed',
  },
}))

const SecretSettings = ({ className }: Props) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton
        size="small"
        className={className}
        onClick={() => setOpen(true)}
      >
        <SettingsIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="secret-settings-dialog"
      >
        <DialogTitle id="secret-settings-dialog">
          {'Secret Settings'}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>{'Adjust your secret settings'}</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {'Save'}
          </Button>
        </DialogActions>

        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          className={classes.footer}
        >
          <div className={classes.footerLinksWrapper}>
            <Link
              color="inherit"
              href="https://github.com/minvs1/airnote"
              target="_blank"
              rel="noopener noreferrer"
            >
              {'GitHub'}
            </Link>
          </div>
        </Typography>
      </Dialog>
    </>
  )
}

export default SecretSettings
