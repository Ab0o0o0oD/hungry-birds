import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useItem } from '../../state/ItemContext';
import styles from './checkout-modal.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { CartItemComponent } from '../card-item/CartItem';
import { RxLapTimer } from 'react-icons/rx';
import { renderTimeViewClock, TimePicker } from '@mui/x-date-pickers';
import { TfiCommentsSmiley } from 'react-icons/tfi';
import { TextField } from '@mui/material';
import { Formik } from 'formik';
import { PaymentParams } from '@/type/paymentParams';
import {createPayment} from "../api";
import {BeatLoader} from "react-spinners";
import { TitleWithIcon } from '../title-with-icon/TitleWithIcon';

interface CheckoutModalProps {
  isOpenCheckoutModal: boolean;
  setIsOpenCheckoutModal: (isOpen: boolean) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpenCheckoutModal,
  setIsOpenCheckoutModal,
}: CheckoutModalProps) => {
  const { state } = useItem();
  const paymentInitialValues: PaymentParams = {
    cartItems: state.cartItems,
    pickUpTime: '',
    paymentDescription: '',
    totalPrice: state.totalPrice,
  };
  const customStyle = {
    content: { color: 'black', padding: '0' },
  };
  const [clock, setClock] = useState<Date | null>(null);
  const [selectedFastest, setselectedFastest] = useState<boolean>(true);
  const handleSubmit = (paymentParams: PaymentParams) => {
    createPayment(paymentParams)
  };
  return (
    <ReactModal
      isOpen={isOpenCheckoutModal}
      contentLabel="Checkout modal"
      style={customStyle}
      bodyOpenClassName={styles.checkoutModalContainer}
      className={styles.checkoutCustomStyle}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
    >
      <div className={styles.modalContentWrapper}>
        <Formik
          initialValues={paymentInitialValues}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(props) => {
            const { values, handleSubmit, handleChange,isSubmitting } = props;
            if(isSubmitting){
              return <div className={styles.spinnerWrapper}><BeatLoader size={30} color={'#ff5b24'} className={styles.submitSpinner}/></div>}
            else
            return (
              <form onSubmit={handleSubmit}>
                <section className={styles.header}>
                  <h1>Order overview</h1>
                  <button
                    className={styles.closeBtn}
                    onClick={() => setIsOpenCheckoutModal(!isOpenCheckoutModal)}
                  >
                    <AiOutlineClose size={25} />
                  </button>
                </section>

                <div className={styles.content}>
                  <h3>Varer:</h3>
                  <section className={styles.itemsWrapper}>
                    {state.cartItems.map((item, index) => (
                      <CartItemComponent product={item.product} key={index} />
                    ))}
                  </section>
                  <section className={styles.orderSettings}>
                    <div className={styles.orderSettingsItemWrapper}>
                      <TitleWithIcon
                        title={'Når ønsker du å hente bestillingen din?'}
                        icon={<RxLapTimer size={25} />}
                      />
                      <div className={styles.orderSettingsBtnsWrapper}>
                        <button
                          name="pickUpTime"
                          className={`${
                            selectedFastest
                              ? styles.fastestBtnSelected
                              : styles.fastestBtn
                          }`}
                          onClick={() => {
                            values.pickUpTime = 'Fortest mulig';
                            setClock(null);
                            setselectedFastest(true);
                          }}
                        >
                          Fortest mulig
                        </button>
                        <TimePicker
                          label={`${clock ? '' : 'Hente tid'}`}
                          disablePast={true}
                          closeOnSelect={true}
                          className={`${
                            clock === null
                              ? styles.timePickerBtn
                              : styles.timePickerBtnSelected
                          }`}
                          value={clock}
                          onChange={(e) => {
                            setselectedFastest(false);
                            setClock(e);
                          }}
                          ampmInClock={false}
                          ampm={false}
                          minutesStep={5}
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                        />
                      </div>
                    </div>
                  </section>
                  <section className={styles.commentSection}>
                    <TitleWithIcon
                      title={'Kommentar'}
                      icon={<TfiCommentsSmiley size={25} />}
                    />
                    <TextField
                      id="Kommentar-multiline-textfield"
                      name="paymentDescription"
                      label="Legg igjen en kommentar til bestillingen din"
                      multiline
                      maxRows={4}
                      value={values.paymentDescription}
                      onChange={handleChange}
                    />
                  </section>
                  <section>
                    <h3>Order summary:</h3>
                    {state?.cartItems?.map((item) => (
                      <p key={item.product.id}>
                        {item.quantity} x {item.product.title}
                      </p>
                    ))}

                    <p>Total price: {state?.totalPrice} kr</p>
                  </section>

                  <section className={styles.paymentMethodSection}>
                    <button className={styles.payWithVippsBtn}>
                      Betal med
                      <img
                        className={styles.logoWrapper}
                        src="./assets/Vipps-logo-wrapper.svg"
                        alt="betal med vipps button"
                      />
                    </button>
                  </section>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </ReactModal>
  );
};
