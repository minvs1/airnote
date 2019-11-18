import React from 'react'
import App from 'next/app'

import { purple } from '@material-ui/core/colors'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

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
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}

export default MyApp
