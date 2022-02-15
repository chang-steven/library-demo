import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


export default function FormDialog({open, handleClose, data, onChange, handleSubmit, isUpdate}) {

    const {name, email, phone } = data;

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    { isUpdate ? "Update Existing User" : "Create New User" }
                </DialogTitle>
                <DialogContent>
                    <TextField id="name" value={name} onChange={e => onChange(e)} placeholder="Enter Name" label="Name" margin="dense" fullWidth />
                    <TextField id="email" value={email} onChange={e => onChange(e)} placeholder="Enter Email" label="Email" margin="dense" fullWidth />
                    <TextField id="phone" value={phone} onChange={e => onChange(e)} placeholder="Enter Phone Number" label="Phone Number" margin="dense" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="outlined" color="primary" onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
  );
}
