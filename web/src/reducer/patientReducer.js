import { combineReducers } from "redux";

//import { RECEIVE_PRODUCTS, ADD_TO_CART } from '../constants/ActionTypes'

/*const product = (state = database.products, action) => {
  console.log("in products");
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1
      }
    default:
      return state;
  }
};*/

const patientList = (state = [], action) => {
  switch (action.type) {
    case "RECEIVE_PATIENTS":
      let a = [
        ...state,
        ...action.patients
      ];
      console.log("patienttList", a, action);
      return a;
    /*case 'RECEIVE_ORDERS':
      //console.log('switch state', state, action);
      let patientObj = state.find((p) => p._id === action.payload.patientId);
      if (patientObj) {
        patientObj.orderItem = action.payload.data;
      }
      console.log('new state', state);
      return state;*/
    default:
      return state;
  }
};

const currentPatient = (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRUNT_PATIENT": {
      let patient = {
        name: action.payload.name,
        patientId: action.payload.patientId,
        orderItemString: action.payload.orderItemString,
        changeType: ''
      };

      console.log("SET_CURRUNT_PATIENT", patient);
      return patient;
    }
    case "UPDATE_CURRENT_ORDER":
      console.log('in currentPatient UPDATE_CURRENT_ORDER')
      let orderItemObj = JSON.parse(state.orderItemString);
      let newOrder = orderItemObj.find((order) => order._id === action.payload.orderId);
      newOrder.message = action.payload.message;
      state.orderItemString = JSON.stringify(orderItemObj);
      state.changeType = 'update';
      console.log("UPDATE_CURRENT_ORDER res", state);
      return state;
    case "CREATE_PATIENT_ORDER": {
      console.log('in currentPatient CREATE_PATIENT_ORDER', state.orderItemString);
      let patientObj = JSON.parse(JSON.stringify(state))
      let orderItemObj = JSON.parse(state.orderItemString);
      //let newOrder = orderItemObj.find((order) => order._id === action.payload.orderId);
      orderItemObj.push(action.payload);
      patientObj.changeType = 'create';
      patientObj.orderItemString = JSON.stringify(orderItemObj);

      console.log("CREATE_PATIENT_ORDER res", state);
      return patientObj;
    }
    default:
      return state;
  }
};

const currentOrder = (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRENT_ORDER": {
      let order = {
        orderId: action.payload.orderId,
        message: action.payload.message,
        isModified: false
      };

      console.log("SET_CURRENT_ORDER", order);
      return order;
    }
    case "UPDATE_CURRENT_ORDER": {
      let order = {
        orderId: action.payload.orderId,
        message: action.payload.message,
        isModified: true
      };

      console.log("in currentOrder SET_CURRENT_ORDER", order);
      return order;
    }
    /*case 'RECEIVE_ORDERS':
      console.log('RECEIVE_ORDERS', state, action);
      state.orderItems = action.payload.data;
      return state;*/
    default: {
      return state;
    }
  }
};


export default combineReducers({
  patientList,
  currentPatient,
  currentOrder
});

export const getPatientList = (state) => {
  console.log("getPatientList", state.patient.patientList);
  return state.patient.patienttList;
};
