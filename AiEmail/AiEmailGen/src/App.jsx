import './App.css'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  const [emailContent,setEmailContent] =useState('');
  const [tone,setTone] =useState('');
  const [loading,setLoading] =useState(false);
  const [generatedReply,setGeneratedReply]=useState('');
  const handleSubmit=async () => {
    setLoading(true);
    try {
      const response=await axios.post("http://localhost:8080/api/email/generate",{
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data==='string' ?
        response.data:JSON.stringify(response.data)
      );
    } catch (error) {
      
    }
    finally{
      setLoading(false);
    }
  };


  return (
      <Container maxWidth="md" sx={{py:4}}>
        <Typography variant='h3' component="h1" gutterBottom>
          Email reply Generator
        </Typography>
        <Box sx={{mx:3}}>
          <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Orignal Email Content"
          value={emailContent || ''}
          onChange={(e)=>setEmailContent(e.target.value)}
          sx={{mb:2}}
          />
          
          <FormControl fullWidth sx={{mb:2}}>
            <InputLabel >Tone(optional)</InputLabel>
            <Select
              value={tone || ''}
              label="Tone(Optional)"
              onChange={(e)=> setTone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
            
        </FormControl>
        
        <Button variant="contained" 
        sx={{mb:2}}
        onClick={handleSubmit}
        disabled={!emailContent || loading}>
           {loading?<CircularProgress size={24}/> : "Generate Reply"}
        </Button>
        </Box> 
        <Box sx={{mx:3}}>
          <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          value={generatedReply || ''}
          slotProps={{
  input: {
    readOnly: true,
  },
}}
          sx={{mb:2}}
          />
          <Button
  variant='outlined'
  onClick={navigator.clipboard.writeText(generatedReply)}>
  copy to clipboard
</Button>
        </Box>
        
      </Container>
   
  )
}

export default App
