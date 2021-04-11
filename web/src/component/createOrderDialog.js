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
import { createOrder } from "../action";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CreateOrderDialog(props) {
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
    //const [open, setOpen] = useState(false);
    //const currentOrder = useSelector(state => state.patient.currentOrder);
    const currentPatient = useSelector(state => state.patient.currentPatient);
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
        console.log('in CreateOrderDialog handleChange', event.target.value);
    };

    const handleAlertClose = () => {
      //setOpen(false);
    };
    const saveButtonHandler = (event) => {
      console.log('in saveButtonHandler', message, props);
        if (message.length > 0) {
          dispatch(createOrder({
            message: message,
            patientId: currentPatient.patientId
          }));
        }
    }

    useEffect(() => {
      console.log('in CreateOrderDialog useEffect', currentPatient.orderItemString);
      /*if (currentPatient.changeType === 'create') {
        setOpen(true);
        props.onClose();  
      }*/
      //setMessage(currentOrder.message);
      //setOrderId(currentOrder.orderId);
      //setOpen(true);
      props.onClose();
      /*if (currentOrder.isModified) {
        
      }*/
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
          //defaultValue=""
          variant="outlined"
          onChange={handleChange}
        />
        <Button variant="contained" onClick={saveButtonHandler}>儲存</Button>
        </Container>
      </Dialog>
    );
  }

  export default CreateOrderDialog;