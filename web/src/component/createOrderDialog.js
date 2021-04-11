import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import { createOrder } from "../action";

const CreateOrderDialog = (props) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const currentPatient = useSelector(state => state.patient.currentPatient);

  const handleClose = () => {
    props.onClose();
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const saveButtonHandler = (event) => {
    if (message.length > 0) {
      dispatch(
        createOrder({
          message: message,
          patientId: currentPatient.patientId
        })
      );
    }
  }

  useEffect(() => {
    props.onClose();
  }, [currentPatient.orderItemString]);

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogTitle>新增醫囑</DialogTitle>
      <Container>
      <TextField
        id="outlined-multiline-static"
        label=""
        multiline
        rows={4}
        variant="outlined"
        onChange={handleChange}
      />
      <Button variant="contained" onClick={saveButtonHandler}>儲存</Button>
      </Container>
    </Dialog>
  );
}

export default CreateOrderDialog;