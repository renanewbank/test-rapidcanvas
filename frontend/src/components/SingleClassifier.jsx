// This code implements:
// - Responsive layout: use of `paper` and `box` with relative widths;
// - Error feedbacks: `Alert` component do MUI;
// - Loading feedbacks: `CircularProgress` in the button (modern UX standard);
import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Alert, 
  Box, 
  CircularProgress,
  Chip 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import api from '../api';

const SingleClassifier = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Calls the POST /predict endpoint
      const response = await api.post('/predict', { text });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to classify text. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // Color mapping for categories (UX Bonus)
  const getCategoryColor = (category) => {
    const colors = {
      'World': 'primary',
      'Sports': 'success',
      'Business': 'warning',
      'Sci/Tech': 'info'
    };
    return colors[category] || 'default';
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom component="div">
            Single News Classification
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter a news headline or snippet below to identify its category.
          </Typography>

          <TextField
            label="News Text"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            endIcon={!loading && <SendIcon />}
            onClick={handlePredict}
            disabled={loading || !text.trim()}
            fullWidth
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Classify Text'}
          </Button>

          {/* Error Feedback */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {/* Result Feedback */}
          {result && (
            <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="subtitle1">Predicted Category:</Typography>
              <Chip 
                label={result.category} 
                color={getCategoryColor(result.category)}
                sx={{ mt: 1, fontSize: '1.2rem', px: 2, py: 2.5 }}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SingleClassifier;