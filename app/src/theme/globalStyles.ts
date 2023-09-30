// Application's global CSS

export const global_styles = {

    body: {
    
      paddingBottom: '100px'
    },
    html: {
      scrollBehavior: 'smooth',
    },
    a: {
      color: '#2864ad'
    },
    '*': {
      fontFamily: "'Inter','sans-serif'",
      /* Firefox scrollbar */
      scrollbarWidth: '5px',
      scrollbarColor: '#bbb #e7e7e7'
    },
    /* Chrome's, Edge's and Safari's scrollbar */
    '*::-webkit-scrollbar': {
      width: '5px',
      height: '5px'
    },
    '*::-webkit-scrollbar-track': {
      backgroundColor: '#e7e7e7'
    },
    '*::-webkit-scrollbar-thumb': {
      borderRadius: '20px',
      backgroundColor: '#bbb'
    }

}
