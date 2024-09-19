// utils/sessionStorageHelper.js
import Cookies from "js-cookie";
import { sessionName, tokenName } from "./Constants";
// import  sessionStorage  from  "react-secure-storage";

// Function to set data in session storage
export const setSessionData = (key, data) => {
  if(Array.isArray(data)){
    Cookies.set(key,JSON.stringify(data));
    sessionStorage.setItem(key,JSON.stringify(data));
  }else{
    Cookies.set(key,data);
    sessionStorage.setItem(key,data);
  }
  };
  // Function to get data from session storage
  export const getSessionData = (key) => {
    const data = sessionStorage.getItem(key);
    if(key=='token'){
      return data ?? null;

    }
    return data ? JSON.parse(data) : null;
  };

  // Function to remove data from session storage
  export const removeSessionData = (key) => {
    // if(Cookies.getItem(key)!=''){
      Cookies.remove(key);
    // }
    sessionStorage.removeItem(key);
  };

  export const mapStatusToClass = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Cancel":
        return "danger";
      case "Complete":
        return "success";
      default:
        return "info";
    }
  };

export const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
};


export const logoutUser=()=>{
    removeSessionData(sessionName);
    removeSessionData(tokenName);

  }
  function isPlainObject(value) {
    return typeof value === 'object' && value !== null && Object.prototype.toString.call(value) === '[object Object]';
  }
