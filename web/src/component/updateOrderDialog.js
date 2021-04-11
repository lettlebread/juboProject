import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';

import { updateOrder } from "../action";

const UpdateOrderDialog = (props) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [orderId, setOrderId] = useState('');
  const currentOrder = useSelector(state => state.patient.currentOrder);

  const handleClose = () => {
    props.onClose();
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const saveButtonHandler = (event) => {
    if (message.length > 0) {
      dispatch(updateOrder({
        orderId: orderId,
        message: message
      }));
    }
  }

  useEffect(() => {
    setMessage(currentOrder.message);
    setOrderId(currentOrder.orderId);

    if (currentOrder.isModified) {
      props.onClose();
    }
  }, [currentOrder]);

  return (
    <Dialog onClose={handleClose} open={props.open}>
      <DialogTitle>修改醫囑</DialogTitle>
      <Container>
      <TextField
        id="outlined-multiline-static"
        label=""
        multiline
        rows={4}
        defaultValue={currentOrder.message}
        variant="outlined"
        onChange={handleChange}
      />
      <Button variant="contained" onClick={saveButtonHandler}>儲存</Button>
      </Container>
    </Dialog>
  );
}

export default UpdateOrderDialog;