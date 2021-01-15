import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");

  const onNameChange = (e) => setName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({name}),
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:3005/shop", requestOptions)
    .then(function(response){ return response.json(); })
    .then(function(data) {
        let cartId = data._id;
        console.log(data)
        console.log(cartId)})
      handleClose()
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  window.onload = () => {
    handleClickOpen();
  };
  return (
      
    <div>
      <Dialog
        open={open}
        onClose={handleClickOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To buy on this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"

            label="Email Address"
            type="text"
            fullWidth
            value={name}
            onChange={onNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
