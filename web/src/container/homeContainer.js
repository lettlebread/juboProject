import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch  } from "react-redux";
import { Container } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PatientCard from "../component/patientCard";
import OrderDialog from "../component/orderDialog";
import UpdateOrderDialog from "../component/updateOrderDialog";
import CreateOrderDialog from "../component/createOrderDialog";


import { getPatientOrders } from "../action";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const HomeContainer = () => {
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [updateOrderDialogOpen, setUpdateOrderDialogOpen] = useState(false);
  const [createOrderDialogOpen, setCreateOrderDialogOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const isEdited = useRef(true);
  const patientList = useSelector(state => state.patient.patientList);
  const currentPatient = useSelector(state => state.patient.currentPatient);
  const currentOrder = useSelector(state => state.patient.currentOrder);
  const dispatch = useDispatch();

  const handleClickOpen = (patientId) => {
    let patient = patientList.find((p) => p._id === patientId);

    dispatch(getPatientOrders(patient));
    setOrderDialogOpen(true);
  };


  const openUpdateDialog = () => {
    setUpdateOrderDialogOpen(true);
  };

  const openCreateDialog = () => {
    setCreateOrderDialogOpen(true);
  };
  
  const handleOrderDialogClose = (value) => {
    setOrderDialogOpen(false);
  };

  const handleUpdateOrderDialogClose = () => {
    setUpdateOrderDialogOpen(false);
  };

  const handleCreateOrderDialogClose = (value) => {
    setCreateOrderDialogOpen(false);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  let patientComps = [];

  patientList.forEach((patient) => {
    patientComps.push(
      <PatientCard
        key={patient._id}
        name={patient.name}
        patientId={patient._id}
        orderId={patient.orderId}
        onOpenDialog={handleClickOpen}
      />
    );
  });

  useEffect(() => {
    if (isEdited.current) {
      isEdited.current = false;
      return;
    }

    switch(currentPatient.changeType) {
      case 'update': 
        setAlertText('編輯成功');
        setOpenAlert(true);  
        break;
      case 'create': 
        setAlertText('新增成功');
        setOpenAlert(true);  
        break;
      default:
        break;
    }
  }, [currentPatient.orderItemString]);

  return (
    <Container>
      { patientComps }
      <OrderDialog
        name={currentPatient.name}
        orderItemString={currentPatient.orderItemString}
        open={orderDialogOpen}
        onClose={handleOrderDialogClose}
        openUpdateDialog={openUpdateDialog}
        openCreateDialog={openCreateDialog}
       />
      <UpdateOrderDialog
        open={updateOrderDialogOpen}
        onClose={handleUpdateOrderDialogClose}
       />
      <CreateOrderDialog
        open={createOrderDialogOpen}
        onClose={handleCreateOrderDialogClose}
       />
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success">{alertText}</Alert>
      </Snackbar>
    </Container>
  );
}

export default HomeContainer;
