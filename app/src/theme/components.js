const components = ()=> {
    return ({
        MuiPaper: {
            styleOverrides:{
                root: {
                boxShadow: '0 0 0.3em #aaa',
                }
            }
        },
        MuiTextField: {
            defaultProps: {
            size: 'small',
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
            input: {
                fontSize: 12,
            },
            }
        },
        MuiInputLabel: {
            styleOverrides:{
            root:{
                fontSize: 12,
            },
            shrink: {
                fontSize: 16
            }
            }
        },
        MuiFormControlLabel: {
            styleOverrides:{
            label:{
                fontSize: 12,
            }
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
            root: {
                fontSize: 10
            }
            }
        },
        MuiCheckbox: {
            defaultProps: {
            size: 'small'
            }
        },
        MuiButton: {
            defaultProps: {
            size: 'small',
            variant: 'contained'
            }
        }
    })
}

export default components
