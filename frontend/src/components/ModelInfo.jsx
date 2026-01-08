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
  Alert,
  Skeleton 
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
        setError("Failed to load model information. Check connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 1. Loading State
  if (loading) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
        <Skeleton variant="text" sx={{ mt: 2 }} />
        <Skeleton variant="text" width="60%" />
      </Box>
    );
  }

  // 2. Error State
  if (error) {
    return <Alert severity="error" sx={{ mt: 4, mx: 'auto', maxWidth: 800 }}>{error}</Alert>;
  }

  // 3. Safety Check: If data is missing for some reason, don't crash.
  if (!info || !categories) {
     return <Alert severity="warning" sx={{ mt: 4 }}>Data unavailable.</Alert>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Card elevation={2} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <InfoIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
            <Typography variant="h5" fontWeight="bold">
              System Information
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" paragraph>
            This system uses Natural Language Processing (NLP) to automatically categorize news articles into predefined topics.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={4}>
            {/* Model Details Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom fontWeight="medium">
                Model Details
              </Typography>
              <List dense sx={{ bgcolor: 'background.default', borderRadius: 2, p: 1 }}>
                <ListItem>
                  {/* Use optional chaining (?.) just in case */}
                  <ListItemText primary="Algorithm" secondary={info?.name || 'Unknown'} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Training Dataset" secondary={info?.dataset || 'Unknown'} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Version" secondary={info?.version || '1.0'} />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Accuracy (Test Set)" 
                    secondary={<Chip label="~90%" color="success" size="small" sx={{ fontWeight: 'bold' }} />} 
                  />
                </ListItem>
              </List>
            </Grid>

            {/* Categories Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom fontWeight="medium">
                Supported Categories
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {categories.map((cat, index) => (
                  <Chip 
                    key={index} 
                    label={cat} 
                    color="primary" 
                    variant="outlined" 
                    sx={{ fontWeight: 'medium' }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom fontWeight="medium">
            How it works
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            1. <strong>Preprocessing:</strong> The text is cleaned and converted into numerical vectors using TF-IDF.
            <br />
            2. <strong>Inference:</strong> The classifier calculates the probability of the text belonging to each category.
            <br />
            3. <strong>Output:</strong> The category with the highest confidence score is returned.
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
};

export default ModelInfo;