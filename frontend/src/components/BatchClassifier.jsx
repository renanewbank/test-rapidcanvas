// This code includes logic to:
// - Break the text by lines;
// - Send to endpoint /predict/batch;
// - Render a table;
// - Generate a CSV file for download (without extra libs);
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import api from '../api';

const BatchClassifier = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBatchPredict = async () => {
    // Split input by new lines and remove empty lines
    const texts = input.split('\n').filter(t => t.trim() !== '');

    if (texts.length === 0) {
      setError("Please enter at least one line of text.");
      return;
    }

    if (texts.length > 50) {
      setError("Please limit batch to 50 items for this demo.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Send list to backend
      const response = await api.post('/predict/batch', { texts });
      setResults(response.data.predictions);
    } catch (err) {
      console.error(err);
      setError("Failed to process batch. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (results.length === 0) return;

    // Create CSV content
    const headers = "Text,Category\n";
    const rows = results.map(r => `"${r.text.replace(/"/g, '""')}","${r.category}"`).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;

    // Trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "classification_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto'}}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Batch Classification
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter multiple news articles (one per line) to classify them all at once.
          </Typography>

          <TextField
            label="Enter texts (one per line)"
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Apple releases new iPhone...&#10;Neymar scores a goal...&#10;Stocks fall today..."
            sx={{ mb: 2, bgcolor: '#fafafa' }}
          />

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              variant="contained"
              startIcon={!loading && <CloudUploadIcon />}
              onClick={handleBatchPredict}
              disabled={loading || !input.trim()}
              sx={{ flexGrow: 1 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Process Batch'}
            </Button>

            {results.length > 0 && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={handleExportCSV}
              >
                Export CSV
              </Button>
            )}
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {/* Results Table */}
          {results.length > 0 && (
            <TableContainer component={Paper} sx={{ maxHeight: 400, mt: 2 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Text</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: 150 }}>Category</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell sx={{ maxWidth: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.text}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ 
                          bgcolor: row.category === 'Sports' ? '#e8f5e9' : '#e3f2fd', 
                          p: 0.5, 
                          borderRadius: 1, 
                          textAlign: 'center',
                          fontSize: '0.875rem'
                        }}>
                          {row.category}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BatchClassifier;