import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './index.css';
import App from './App.jsx';
import { ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
    palette: {
      primary: {
        light: '#05157a',
        main: '#05157a',
        dark: '#E2F4FF',
        contrastText: '#fff',
      },
      secondary: {
        light: '#E2F4FF',
        main: '#E2F4FF',
        dark: '#E2F4FF',
        contrastText: '#05157a',
      },
    },
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
)
