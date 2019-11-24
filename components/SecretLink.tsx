import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  Link,
} from '@material-ui/core'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

type Props = {
  link: string | null
  onClose: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    linkWrapper: {
      padding: theme.spacing(1),
      background: 'rgba(255, 255, 255, 0.08)',
    },
  })
)

const SecretLink = ({ link, onClose }: Props) => {
  const classes = useStyles()

  // TODO add copy button

  return (
    <Dialog
      open={!!link}
      onClose={onClose}
      aria-labelledby="secret-link-dialog"
      aria-describedby="secret-link-description"
    >
      <DialogTitle id="secret-link-dialog">{'Your secret link'}</DialogTitle>

      <DialogContent>
        <DialogContentText id="secret-link-description">
          {
            "After closing the dialog link will disappear. So don't forget to COPY it now."
          }
        </DialogContentText>

        <div className={classes.linkWrapper}>
          {link && (
            <Link href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </Link>
          )}
        </div>
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
