import axios from '../lib/axios';

export {
  getAllPatients,
  getPatientOrders,
  setCurrentOrder,
  updateOrder,
  createOrder
};

const getAllPatients = () => (dispatch) => {
  axios.get('patient').then((res) => {
    dispatch({
      type: "RECEIVE_PATIENTS",
      payload: res.data
    });
  }).catch((error) => {
    console.log(error);
  });
};

const getPatientOrders = (patient) => (dispatch) => {
  axios.get('getPatientOrder/' + patient._id).then((res) => {
    dispatch({
      type: "SET_CURRUNT_PATIENT",
      payload: {
        patientId: patient._id,
        name: patient.name,
        orderItemString: JSON.stringify(res.data)
      }
    });
  }).catch((error) => {
    console.log(error);
  });
};

const setCurrentOrder = (payload) => (dispatch) => {
  dispatch({
    type: 'SET_CURRENT_ORDER',
    payload: {
      orderId: payload.orderId,
      message: payload.message
    }
  });
};

const updateOrder = (payload) => (dispatch) => {
  axios.put('order/' + payload.orderId, { message: payload.message }).then((res) => {
    dispatch({
      type: 'UPDATE_CURRENT_ORDER',
      payload: {
        orderId: res.data._id,
        message: res.data.message,  
      }
    });
  }).catch((error) => {
    console.log(error);
  });
};

const createOrder = (payload) => (dispatch) => {
  let params = {
    message: payload.message,
    patientId: payload.patientId
  };

  axios.post('order/', params).then((res) => {
    dispatch({
      type: 'CREATE_PATIENT_ORDER',
      payload: res.data
    });
  }).catch((error) => {
    console.log(error);
  });
};