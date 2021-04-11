//import "../style/styles.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import {useSelector, useDispatch} from 'react-redux';
import { setCurrentOrder } from "../action";

function OrderItem(props) {
  /*function handleClickOpen() {
    console.log('in OrderItem', patientId);
    onOpenDialiig(patientId);
  }*/
  const dispatch = useDispatch();

  const editButtonHanlder = () => {
    console.log('in editButtonHanlder', props);
    props.editButtonHandler();
    dispatch(setCurrentOrder({
      orderId: props.orderId,
      message: props.message
    }));
  }

  return (
    <Card>
        <CardContent>
        <Typography>
          內容: {props.message}
        </Typography>
        <IconButton color="primary" aria-label="edit order" component="span">
          <EditIcon onClick={editButtonHanlder}/>
        </IconButton>
        </CardContent>
    </Card>
  );
}

OrderItem.propTypes = {
  message: PropTypes.string
};

export default OrderItem;
