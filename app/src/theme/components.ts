// https://mui.com/material-ui/customization/theme-components/

// MUI
import { Components } from "@mui/material"

export const components = (): Components => ({

    MuiPaper: {
        defaultProps: {
            elevation: 0
        },
        styleOverrides:{
            root: ({theme}: any)=> ({
                borderRadius: 8,
                border: '1px solid',
                borderColor: theme.palette.info.main,
            })
        }
    },
    MuiDivider: {
        styleOverrides:{
            root: ({theme}: any)=> ({
                borderColor: theme.palette.info.main
            })
        }
    },
    MuiTableCell: {
        styleOverrides: {
            head: ({theme}: any)=> ({
                fontSize: '12px',
                padding: '10px 12px',
                color: theme.palette.text.secondary
            }),
            body: ({theme}: any)=> ({
                padding: '8px 12px',
                fontSize: '11px',
                color: theme.palette.text.secondary
            }),
            root: ({theme}: any)=> ({
                whiteSpace: 'nowrap',
                borderColor: theme.palette.info.main,
            })
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
                marginLeft: 5
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
    MuiSwitch: {
        defaultProps: {
            size: 'small'
        }
    },
    MuiButton: {
        defaultProps: {
            size: 'small',
            variant: 'contained',
            disableElevation: true
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
    MuiMenu: {
        defaultProps: {
            slotProps: {
                paper: {
                    elevation: 0
                }
            }
        }
    },
    MuiMenuItem: {
        styleOverrides: {
            root: {
                fontSize: 12,
            }
        }
    }
})
