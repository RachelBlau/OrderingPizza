import * as React from 'react';
import { useState } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PASSWORD } from '../interface/config';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AdminLoginModal() {
  const Password = PASSWORD;
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password === PASSWORD) {
      navigate("/allOrders");
    } else {
      alert("Incorrect password. Please try again.  (password=1234)");
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>admin login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter an administrator password
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handlePasswordSubmit}>
              <TextField
                label="Password"
                variant="outlined"
                defaultValue={password}
                required
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary">
                submit
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}