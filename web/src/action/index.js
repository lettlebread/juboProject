import axios from '../lib/axios';

export {
  getAllPatients,
  getPatientOrders,
  setCurrentOrder,
  updateOrder,
  createOrder
};

const receivePatients = (patients) => ({
  type: "RECEIVE_PATIENTS",
  patients
});

const getAllPatients = () => (dispatch) => {
  axios.get('patient').then((res) => {
    console.log('getAllPatients res', res);
    dispatch(receivePatients(res.data));
  }).catch((error) => {
    console.log(error);
  });
};

const receiveOrders = (payload) => ({
  type: "RECEIVE_ORDERS",
  payload: payload
});

const setCurrentPatient = (payload) => ({
  type: "SET_CURRUNT_PATIENT",
  payload: payload
});

const getPatientOrders = (patient) => (dispatch) => {
  console.log('in getPatientOrders', patient);
  axios.get('getPatientOrder/' + patient._id).then((res) => {
    console.log('getPatientOrders res', res.data);
    dispatch(setCurrentPatient({
      patientId: patient._id,
      name: patient.name,
      orderItemString: JSON.stringify(res.data),

    }));
  }).catch((error) => {
    console.log(error);
  });
};

const setCurrentOrder = (payload) => (dispatch) => {
  console.log('in setCurrentOrder', payload);
  dispatch({
    type: 'SET_CURRENT_ORDER',
    payload: {
      orderId: payload.orderId,
      message: payload.message
    }
  });
};

const updateOrder = (payload) => (dispatch) => {
  console.log('in action updateOrder', payload);
  axios.put('order/' + payload.orderId, { message: payload.message }).then((res) => {
    console.log('updateOrder res', res.data);
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
  console.log('in action createOrder', payload);
  let params = {
    message: payload.message,
    patientId: payload.patientId
  };
  axios.post('order/', params).then((res) => {
    console.log('createOrder res', res.data);
    dispatch({
      type: 'CREATE_PATIENT_ORDER',
      payload: res.data
    });
  }).catch((error) => {
    console.log(error);
  });
};