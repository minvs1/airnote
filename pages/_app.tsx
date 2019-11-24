import React from 'react'
import App from 'next/app'

import { purple } from '@material-ui/core/colors'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { SnackbarProvider, WithSnackbarProps } from 'notistack'
import Button from '@material-ui/core/Button'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#fff' },
    secondary: { main: purple[500] },
    background: {
      default: '#000',
    },
  },
})

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps } = this.props
    const notistackRef = React.createRef<WithSnackbarProps>()

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <SnackbarProvider
          maxSnack={1}
          ref={notistackRef}
          action={key => (
            <Button
              color="secondary"
              onClick={() => {
                const snackbar = notistackRef.current

                if (snackbar) {
                  snackbar.closeSnackbar(key)
                }
              }}
            >
              {'Dismiss'}
            </Button>
          )}
        >
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    )
  }
}

export default MyApp
