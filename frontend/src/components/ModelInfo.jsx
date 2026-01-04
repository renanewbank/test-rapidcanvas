import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Chip, 
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import api from '../api';

const ModelInfo = () => {
  const [info, setInfo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both endpoints in parallel
        const [infoRes, catsRes] = await Promise.all([
          api.get('/model/info'),
          api.get('/categories')
        ]);

        setInfo(infoRes.data);
        setCategories(catsRes.data.categories);
      } catch (err) {
        console.error(err);
        setError("Failed to load model information.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InfoIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
            <Typography variant="h5">
              System Information
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" paragraph>
            This system uses Natural Language Processing (NLP) to automatically categorize news articles into predefined topics.
            It was built as part of the RapidCanvas technical assessment.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={3}>
            {/* Model Details Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Model Details
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Algorithm" secondary={info?.name || 'N/A'} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Training Dataset" secondary={info?.dataset || 'N/A'} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Version" secondary={info?.version || '1.0'} />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Accuracy (Test Set)" 
                    secondary={<Chip label="~90%" color="success" size="small" />} 
                  />
                </ListItem>
              </List>
            </Grid>

            {/* Categories Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Supported Categories
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {categories.map((cat, index) => (
                  <Chip key={index} label={cat} variant="outlined" />
                ))}
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="h6" gutterBottom>
            How it works
          </Typography>
          <Typography variant="body2" color="text.secondary">
            1. <strong>Preprocessing:</strong> The text is cleaned and converted into numerical vectors using TF-IDF.
            <br />
            2. <strong>Inference:</strong> The Naive Bayes classifier calculates the probability of the text belonging to each category.
            <br />
            3. <strong>Output:</strong> The category with the highest probability is returned to the user.
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
};

export default ModelInfo;