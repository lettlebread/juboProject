//import "../style/styles.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {useSelector, useDispatch} from 'react-redux';
import { getPatientOrders } from "../action";


function PatientCard({
  name,
  patientId,
  orderId,
  onOpenDialog
}) {
  const dispatch = useDispatch();

  function handleClickOpen() {
    console.log('in PatientCard', patientId);
    /*dispatch({
      type: 'SET_CURRUNT_USER',
      payload: {
        name: name,
        patientId: patientId
      }
    });*/
    //getPatientOrders(patientId);
    onOpenDialog(patientId);
  }

  return (
    <Card onClick={handleClickOpen}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography  color="textSecondary">
          醫囑數目: {orderId.length}
        </Typography>
      </CardContent>
    </Card>
  );
}

PatientCard.propTypes = {
  productId: PropTypes.string,
  name: PropTypes.string
};

export default PatientCard;
