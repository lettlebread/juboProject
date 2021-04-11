import { combineReducers } from "redux";

const patientList = (state = [], action) => {
  switch (action.type) {
    case "RECEIVE_PATIENTS":
      return action.payload;
    default:
      return state;
  }
};

const currentPatient = (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRUNT_PATIENT": 
      let currentPatient = {
        name: action.payload.name,
        patientId: action.payload.patientId,
        orderItemString: action.payload.orderItemString,
        changeType: ''
      };

      return currentPatient;
    case "UPDATE_CURRENT_ORDER": {
      let orderItemObj = JSON.parse(state.orderItemString);
      let newOrder = orderItemObj.find((order) => order._id === action.payload.orderId);

      newOrder.message = action.payload.message;
      state.orderItemString = JSON.stringify(orderItemObj);
      state.changeType = 'update';
      return state;
    }
    case "CREATE_PATIENT_ORDER": {
      let patientObj = JSON.parse(JSON.stringify(state))
      let orderItemObj = JSON.parse(state.orderItemString);

      orderItemObj.push(action.payload);
      patientObj.changeType = 'create';
      patientObj.orderItemString = JSON.stringify(orderItemObj);
      return patientObj;
    }
    default: {
      return state;
    }
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

      return order;
    }
    case "UPDATE_CURRENT_ORDER": {
      let order = {
        orderId: action.payload.orderId,
        message: action.payload.message,
        isModified: true
      };

      return order;
    }
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