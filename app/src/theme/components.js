// https://mui.com/material-ui/customization/theme-components/

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
        MuiSelect: {
            styleOverrides: {
                outlined: {
                    padding: '6px 12px',
                }
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
        MuiFormControl: {
            defaultProps: {
                size: 'small'
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
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: 12
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
