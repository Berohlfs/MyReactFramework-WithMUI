// Application's global CSS

export const global_styles = (theme: 'dark' | 'light') => ({
    body: {
        paddingBottom: '150px'
    },
    html: {
        scrollBehavior: 'smooth'
    },
    a: {
        color: theme === 'dark' ? '#2864ab' : '#2864dd',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    '*': {
        fontFamily: "'Poppins','sans-serif'",
        /* Firefox scrollbar */
        scrollbarWidth: '5px',
        scrollbarColor: `${theme === 'dark' ? '#555' : '#aaa'} ${theme === 'dark' ? '#211f2d' : '#e9e9e9'}`
    },
    /* Chrome's, Edge's and Safari's scrollbar */
    '*::-webkit-scrollbar': {
        width: '5px',
        height: '5px'
    },
    '*::-webkit-scrollbar-thumb': {
        borderRadius: '3px',
        backgroundColor: theme === 'dark' ? '#555' : '#aaa'
    },
    '*::-webkit-scrollbar-track': {
        backgroundColor: theme === 'dark' ? '#211f2d' : '#e9e9e9'
    }
})
