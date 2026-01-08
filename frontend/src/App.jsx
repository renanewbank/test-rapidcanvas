import React, { useState } from 'react';
import { 
  Container, 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Tabs, 
  Tab, 
  CssBaseline,
  ThemeProvider,
  createTheme,
  Paper,
  useMediaQuery
} from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SingleClassifier from './components/SingleClassifier';
import BatchClassifier from './components/BatchClassifier';
import ModelInfo from './components/ModelInfo';

// --- BRANDING CONFIGURATION ---
const brandColors = {
  orange: '#ff663e',
  pink: '#fd9dff',
  darkText: '#2d3748',
  bgLight: '#f8f9fa'
};

const theme = createTheme({
  palette: {
    primary: {
      main: brandColors.orange,
      contrastText: '#ffffff',
    },
    secondary: {
      main: brandColors.pink,
    },
    background: {
      default: brandColors.bgLight,
    },
    text: {
      primary: brandColors.darkText,
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0e1328',
          color: brandColors.darkText,
          boxShadow: '0px 1px 3px rgba(0,0,0,0.05)'
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: brandColors.orange,
          height: 3,
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          '&.Mui-selected': {
            color: brandColors.orange,
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)'
        },
      },
    },
  },
});

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh' 
      }}>

        {/* Header */}
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <NewspaperIcon sx={{ mr: 2, color: brandColors.orange }} />
              <Typography variant="h6" component="div" sx={{ 
                 fontWeight: 800,
                 background: `linear-gradient(45deg, ${brandColors.orange}, ${brandColors.pink})`,
                 backgroundClip: 'text',
                 textFillColor: 'transparent',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
              }}>
                RapidCanvas
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Navigation Tabs */}
        <Paper elevation={0} square sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange} 
            centered={!isMobile}
            variant={isMobile ? "fullWidth" : "standard"}
            indicatorColor="primary"
          >
            <Tab label="Single Classification" />
            <Tab label="Batch Classification" />
            <Tab label="Model Information" />
          </Tabs>
        </Paper>

        <Container 
          maxWidth="md" 
          sx={{ 
            flexGrow: 1,
            py: 4, 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}
        >
          {(currentTab === 0 || currentTab === 1) && (
             <Box sx={{ textAlign: 'center', mb: 4, mt: 1 }}>
              <Typography variant={isMobile ? "h5" : "h4"} component="h1" gutterBottom fontWeight="800">
                Text Classification with AI
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                Full-Stack Application with Machine Learning. Instantly categorize articles into World, Sports, Business or Sci/Tech.
              </Typography>
            </Box>
          )}

          {/* Content Render */}
          <Box sx={{ width: '100%' }}>
              {currentTab === 0 && <SingleClassifier />}
              {currentTab === 1 && <BatchClassifier />}
              {currentTab === 2 && <ModelInfo />}
          </Box>

        </Container>

        {/* Footer */}
        <Box sx={{ bgcolor: 'white', p: 3, textAlign: 'center', borderTop: '1px solid #e0e0e0' }}>
          <Typography variant="body2" color="text.secondary">
            © 2026 RapidCanvas Junior Data Analyst Assessment
          </Typography>
        </Box>

      </Box>
    </ThemeProvider>
  );
}

export default App;