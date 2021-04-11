import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch  } from "react-redux";
import { Container } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PatientCard from "../component/patientCard";
import OrderDialog from "../component/orderDialog";
import UpdateOrderDialog from "../component/updateOrderDialog";
import CreateOrderDialog from "../component/createOrderDialog";


import { getPatientOrders } from "../action";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function HomeContainer({
  //getPatientOrders
}) {
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [updateOrderDialogOpen, setUpdateOrderDialogOpen] = useState(false);
  const [createOrderDialogOpen, setCreateOrderDialogOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const isEdited = useRef(true);
  const usCreated = useRef(true);


  //const [currentPatientName, setCurrentPatientName] = useState('');
  //const [currentPatientId, setCurrentPatientId] = useState('');

  const [currentOrderItems, setDurrentOrderItems] = useState([]);

  let patientComps = [];
  let orderDialog = '';
  const patientList = useSelector(state => state.patient.patientList);
  const currentPatient = useSelector(state => state.patient.currentPatient);
  const currentOrder = useSelector(state => state.patient.currentOrder);


  console.log('HomeContainer patientList', patientList);
  const dispatch = useDispatch();

  /*const handleClickOpen = useCallback((patientId) => {
    console.log('handleClickOpen', patientId);
    setCurrentPatientId(patientId);
    getPatientOrders(currentPatientId)
  }, [dispatch]);*/

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
  function handleClickOpen(patientId) {
    let patient = patientList.find((p) => p._id === patientId);
    console.log('handleClickOpen', patientId);
    //setCurrentPatientId(patientId);
    //getPatientOrders(patient);
    //useCallback(() => {
      dispatch(getPatientOrders(patient));
    //});


    setOrderDialogOpen(true);
  };

  useEffect(() => {
    console.log('in useeffect currentOrder', currentOrder);
  }, [currentOrder]);

  //useCallback
  useEffect(() => {
    
    console.log('in useeffect', currentPatient);
    let patient = patientList.find((p) => p._id === currentPatient.patientId);
    console.log('in effect patient', patient);
  }, [currentPatient]);

  const openUpdateDialog = () => {
    setUpdateOrderDialogOpen(true);
  };

  const openCreateDialog = () => {
    console.log('in openUpdateDialog');
    setCreateOrderDialogOpen(true);
  };
  
  const handleOrderDialogClose = (value) => {
    setOrderDialogOpen(false);
    //setSelectedValue(value);
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

  /*useEffect(() => {
    if (currentOrder.isModified) {
      setAlertText('修改成功');
      setOpenAlert(true);
    }
  }, [currentOrder]);*/

  useEffect(() => {
    console.log('useEffect currentPatient.changeType', currentPatient.changeType);
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
      
    //setOpenAlert(true);  
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
        //setCurrentOrder={setCurrentOrder}
        //handleUpdateOrderDialogClose={handleUpdateOrderDialogClose}
       />
      <UpdateOrderDialog
        //orderId={currentOrder.orderId}
        //message={currentOrder.message}
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
  /*constructor(props) {
    super(props);

    this.state = {
      patientList: props.patientList
    };
  }*/

  /*render() {
    let patientList = [];
    this.state.patientList {
      patientList.push(
        <PatientCard
          name={key}
          name={this.state.patientList[key].name}
          key={key}
        />
      );
    }

    return (
      <Container />
    );
  }*/
}

export default HomeContainer;
