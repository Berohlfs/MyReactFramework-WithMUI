// MUI
import { CssBaseline, GlobalStyles } from '@mui/material'

function App() {

  const global_styles = {
    body: {
      backgroundColor: '#efefef',
      paddingBottom: '50px'
    },
    html: {
      scrollBehavior: 'smooth'
    }
  }

  return (
    <>
      <CssBaseline/>
      <GlobalStyles styles={global_styles}/>
    </>
  )
}

export default App
