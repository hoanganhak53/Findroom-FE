import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export default function DelayingAppearance({promise}) {
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [msg, setMsg] = React.useState(false)
  React.useEffect(()=>{
    if(promise){
      promise.then(data => {
        setMsg(data.data.message)
        setSuccess(true)
      }).catch(e => {
        setMsg(e.message)
        setError(false)
      })
    }
  }, [promise])
  if(!success && !error){
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding:'40px 100px' }}>
        <CircularProgress />
      </Box>
    );
  }
  if(success){
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding:'40px 100px' }}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <CheckCircleIcon style={{color: '#2980B9', fontSize: '70px'}}/>
          <p style={{marginTop: '20px', fontSize: '20px'}}>{msg}</p>
        </div>
      </Box>
    );
  }
  if(error){
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding:'40px 100px' }}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <ErrorIcon style={{color: 'rgb(231, 76, 60)', fontSize: '70px'}}/>
          <p style={{marginTop: '20px', fontSize: '20px'}}>{msg}</p>
        </div>
      </Box>
    );
  }
}