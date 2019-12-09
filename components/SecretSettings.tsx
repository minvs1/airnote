import { useState } from 'react'
import {
  Typography,
  Link,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import { makeStyles } from '@material-ui/core/styles'
import { expireTime } from '../utils'

interface Props {
  className: string
  settings: {
    selfDestruct: string
  }
  setSettings: any
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

const SecretSettings = ({ className, settings, setSettings }: Props) => {
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
            select
            margin="dense"
            label="Self desctruction"
            fullWidth
            value={settings.selfDestruct}
            onChange={event =>
              setSettings({ ...settings, selfDestruct: event.target.value })
            }
            helperText="Destroy this note after a specific time, even if it's not read."
          >
            {expireTime.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
          <span className={classes.footerLinksWrapper}>
            <Link
              color="inherit"
              href="https://github.com/minvs1/airnote"
              target="_blank"
              rel="noopener noreferrer"
            >
              {'GitHub'}
            </Link>
          </span>
        </Typography>
      </Dialog>
    </>
  )
}

export default SecretSettings
