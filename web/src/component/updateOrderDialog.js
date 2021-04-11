import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Container } from '@material-ui/core';

//import PersonIcon from '@material-ui/icons/Person';
//import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

import { blue } from '@material-ui/core/colors';
import {useSelector, useDispatch} from 'react-redux';
import OrderItem from '../component/orderItem';
import { updateOrder } from "../action";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function UpdateOrderDialog(props) {
    const useStyles = makeStyles({
        avatar: {
          backgroundColor: blue[100],
          color: blue[600],
        },
      });
    const classes = useStyles();
    const dispatch = useDispatch();
    //const [orderItemString, setOrderItemString] = useState('');
    const [message, setMessage] = useState('');
    const [orderId, setOrderId] = useState('');
    const [open, setOpen] = useState(false);
    const currentOrder = useSelector(state => state.patient.currentOrder);
    //const [orderItems, setOrderItems] = useState([]);
    //let patientList = useSelector(state => state.patient.patientList);


    const handleClose = () => {
      props.onClose();
    };
  
    const handleListItemClick = (value) => {
      props.onClose(value);
    };

    const handleChange = (event) => {
        setMessage(event.target.value);
        console.log('in UpdateOrderDialog handleChange', event.target.value);
    };

    const handleAlertClose = () => {
      setOpen(false);
    };
    const saveButtonHandler = (event) => {
      console.log('in saveButtonHandler', message, props);
        if (message.length > 0) {
          dispatch(updateOrder({
            orderId: orderId,
            message: message
          }));
        }
    }

    useEffect(() => {
      console.log('in updateD useEffect');
      setMessage(currentOrder.message);
      setOrderId(currentOrder.orderId);

      if (currentOrder.isModified) {
        setOpen(true);
        props.onClose();
      }
    }, [currentOrder]);
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
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