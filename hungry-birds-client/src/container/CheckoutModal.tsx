import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useItem } from '../state/ItemContext';
import styles from './checkout-modal.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { CartItemComponent } from '../components/CartItem';
import { RxLapTimer } from 'react-icons/rx';
import { renderTimeViewClock, TimePicker } from '@mui/x-date-pickers';
import { TfiCommentsSmiley } from 'react-icons/tfi';
import { TextField } from '@mui/material';
import { TitleWithIcon } from '../components/TitleWithIcon';

interface CheckoutModalProps {
  isOpenCheckoutModal: boolean;
  setIsOpenCheckoutModal: (isOpen: boolean) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpenCheckoutModal,
  setIsOpenCheckoutModal,
}: CheckoutModalProps) => {
  const { state } = useItem();
  const customStyle = {
    content: { color: 'black', padding: '0' },
  };
  const [clock, setClock] = useState<Date | null>(null);

  const [selectedFastest, setselectedFastest] = useState<boolean>(true);
  return (
    <ReactModal
      isOpen={isOpenCheckoutModal}
      contentLabel="Checkout modal"
      style={customStyle}
      bodyOpenClassName={styles.checkoutModalContainer}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
    >
      <div className={styles.modalContentWrapper}>
        <section className={styles.header}>
          <h1>Til Betaling</h1>
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
                  className={`${
                    selectedFastest
                      ? styles.fastestBtnSelected
                      : styles.fastestBtn
                  }`}
                  onClick={() => {
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
              name="Kommentar til bestillingen din"
              label="Legg igjen en kommentar til bestillingen din"
              multiline
              maxRows={4}
              hiddenLabel={true}
            />
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
      </div>
    </ReactModal>
  );
};
