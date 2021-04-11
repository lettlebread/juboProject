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
import { Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

//import PersonIcon from '@material-ui/icons/Person';
//import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import {useSelector, useDispatch} from 'react-redux';
import OrderItem from '../component/orderItem';
import { getPatientOrders } from "../action";




function OrderDialog(props) {
    const useStyles = makeStyles({
        avatar: {
          backgroundColor: blue[100],
          color: blue[600],
        },
      });
    const classes = useStyles();
    const dispatch = useDispatch();
    //const [orderItemString, setOrderItemString] = useState('');
    const [name, setName] = useState('');
    const [orderItems, setOrderItems] = useState([]);
    //let patientList = useSelector(state => state.patient.patientList);
    let orderComponents = [];

    //const { onClose, selectedValue, open } = props;
    console.log('in OrderDialog', props);

    //useDispatch(getPatientOrders(props.patientId));
    /*useEffect(() => {
      dispatch(getPatientOrders(patientId));
    }, []);*/
    //let orderList = useSelector(state => state.order.patientList);
    /*useEffect(() => {
      if (patientId) {
          //dispatch(getPatientOrders(patientId));
      }

      let patientData = patientList.find((p) => p._id === patientId);
      if (patientData && patientData.orderItem) {
        console.log('patientData', patientData);
        patientData.orderItem.forEach((order) => {
          orderComponents.push(
            <OrderItem
              message={order.message}
            />
          );
        });
      }
    }, []);*/
    const handleClose = () => {
      props.onClose();
    };
  
    const handleListItemClick = (value) => {
      props.onClose(value);
    };

    const editButtonHandler = () => {
      props.openUpdateDialog();
    };

    const createButtonHanlder = () => {
      props.openCreateDialog();
    };

    useEffect(() => {
      //dispatch(getPatientOrders(props.patientId));
      if (props.orderItemString) {
        console.log('orderdialog effect', props, JSON.parse(props.orderItemString));

        setName(props.name);
        setOrderItems(JSON.parse(props.orderItemString));
        console.log('orderItems', orderItems);
        
      }

    }, [props]);

    orderItems.forEach((order) => {
      orderComponents.push(
        <OrderItem
          key={order._id}
          orderId={order._id}
          message={order.message}
          editButtonHandler={editButtonHandler}
        />
      );
    });
    //console.log('OrderDialog patientList', patientList.find((p) => p._id === patientId));




  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
        <DialogTitle>病患資料</DialogTitle>
        <Container>
          <Typography variant="h5" component="h2">
            姓名 {name}
          </Typography>
          <Typography variant="h5" component="h2">
            醫囑
          </Typography>
          <IconButton color="primary" aria-label="edit order" component="span">
            <AddIcon onClick={createButtonHanlder}/>
          </IconButton>
          {orderComponents}
        </Container>
      </Dialog>
    );
  }

  export default OrderDialog;