import { combineReducers } from "redux";

const orderList = (state = [], action) => {
  switch (action.type) {
    case "RECEIVE_ORDERS":
      let a = [
        ...state,
        ...action.patients
      ];
      console.log("patienttList", a, action);
      return a;
    default:
      return state;
  }
};

export default combineReducers({
    orderList
});

export const getPatientList = (state) => {
  console.log("getPatientList", state.patient.patientList);
  return state.patient.patienttList;
};
