import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: { main: '#000000' },
        secondary: { main: '#f5f5f5' },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    display: 'block'
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h4: {
                    fontWeight: 'bold',
                },
            },
        },
    },
});