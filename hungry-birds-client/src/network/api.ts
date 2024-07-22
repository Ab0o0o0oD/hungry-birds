import axios from 'axios';
import {PaymentParams} from "@/type/paymentParams";

export const createPayment = (paymentParams: PaymentParams) => {
  axios
    .post('http://localhost:8080/api/create-payment',{
      value: paymentParams.totalPrice * 100,
      phoneNumber: "4790738410", //this only allowed in test
      returnUrl: 'http://localhost:3000/receipt',
      paymentDescription: paymentParams.paymentDescription,
    })
    .then(function (response) {
      window.location = response.data.redirectUrl

    })
    .catch(function (error) {
      console.log(error);
    });
};
