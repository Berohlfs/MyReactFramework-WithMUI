// https://mui.com/material-ui/customization/theme-components/

// MUI
import { Components } from "@mui/material"

const components: Components = {

    MuiTableCell: {
        styleOverrides: {
            head: {
                color: '#888',
                fontSize: '12px',
                padding: '10px 12px',
            },
            body: {
                padding: '8px 12px',
                fontSize: '11px'
            },
            root: {
                whiteSpace: 'nowrap',
            }
        }
    },
    MuiPaper: {
        styleOverrides:{
            root: {
                boxShadow: '0 0 0.2em #ccc',
            }
        }
    },
    MuiFormControl: {
        defaultProps: {
            size: 'small'
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
    MuiFormHelperText: {
        styleOverrides: {
            root: {
                fontSize: 10
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
    MuiCheckbox: {
        defaultProps: {
            size: 'small'
        },
        styleOverrides: {
            root: {
                paddingLeft: 10
            }
        }
    },
    MuiButton: {
        defaultProps: {
            size: 'small',
            variant: 'contained',
        },
        styleOverrides: {
            root: {
                textTransform: 'none'
            }
        }
    },
    MuiChip: {
        defaultProps: {
            size: 'small',
            variant: 'outlined'
        },
        styleOverrides: {
            root: {
                fontSize: '10px',
                fontWeight: 'bold'
            }
        }
    },
    MuiMenuItem: {
        styleOverrides: {
            root: {
                fontSize: 12
            }
        }
    }

}

export default components