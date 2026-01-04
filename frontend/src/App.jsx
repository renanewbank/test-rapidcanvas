import React, { useState } from 'react';
import { 
  Container, 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Tabs, 
  Tab, 
  CssBaseline 
} from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SingleClassifier from './components/SingleClassifier';
import BatchClassifier from './components/BatchClassifier';
import ModelInfo from './components/ModelInfo'

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <CssBaseline /> {/* Resets CSS for consistent look */}
      
      {/* Header / Navigation */}
      <AppBar position="static">
        <Toolbar>
          <NewspaperIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RapidCanvas News Classifier
          </Typography>
        </Toolbar>
        <Box sx={{ bgcolor: 'white' }}>
          <Tabs value={currentTab} onChange={handleTabChange} centered>
            <Tab label="Single Classification" />
            <Tab label="Batch Process" />
            <Tab label="Model Info" />
          </Tabs>
        </Box>
      </AppBar>

      {/* Main Content Area - Responsive Container */}
      <Container maxWidth="lg" sx={{ minHeight: '80vh', py: 4 }}>
        
        {/* Conditional Rendering based on Tab */}
        {currentTab === 0 && <SingleClassifier />}
        {currentTab === 1 && <BatchClassifier />}
        {currentTab === 2 && <ModelInfo />}

      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: '#eee', p: 2, mt: 'auto', textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Junior Data Scientist Assessment - 2026
        </Typography>
      </Box>
    </>
  );
}

export default App;