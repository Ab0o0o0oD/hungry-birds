import { PrimaryButton } from "@/components/buttons/primary-button/PrimaryButton";
import { Header } from "@/components/Header/Header";
import { formatShortDate, formatShortTime } from "@/lib/datetime";
import { useItem } from "@/state/ItemContext";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styles from "./receipt.module.scss";
import { calculateVat } from "@/lib/mva";
import { useNavigate } from "react-router-dom";
export const Receipt = () => {

    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate()
    const handlePrint = useReactToPrint({
        content: () => ref.current,
        documentTitle: 'Salgskvittering',
        onAfterPrint: () => { },
    });
    // TODO Get the items from backend. 
    const { state } = useItem();
    const date = new Date();

    return (
        <div>
            <Header />
            <div className={styles.container} ref={ref}>
                <div className={styles.receiptHeader}>
                    <img
                        className={styles.receiptLogo}
                        src="./assets/logo.PNG"
                        alt="header"
                    />
                </div>
                <div className={styles.receiptOrg}>
                    <p >Org nr: 2222222</p>
                    <p>Grønland 30</p>
                    <p>0188 Oslo</p>
                    <p>Telefon: 9999999</p>
                </div>
                <div className={styles.row}>
                    <p className={styles.receiptTextBod}>{formatShortDate(date)} {formatShortTime(date)}</p>
                </div>
                <div>
                    <h2>Verdikode</h2>
                    <p className={styles.receiptText}>Order nummer: <strong>#1111</strong> </p>
                </div>
                <h3>Salgskvittering</h3>
                <ul className={styles.listGroup}>
                    {state.cartItems.map((item, index) => (
                        <li key={index} className={styles.listGroupItem}>
                            <span>{item.product.title}</span>
                            <span className={styles.receiptTextBod}>{item.product.price} kr</span>
                        </li>
                    ))}
                </ul>
                <div className={styles.row}>
                    <p className={styles.receiptTextBod}>MVA 15,00%</p>
                    <p>{calculateVat(state.totalPrice).vat}</p>
                </div>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <p className={styles.receiptTextBod}>Grunnlag</p>
                        <p>{calculateVat(state.totalPrice).priceWithOutVat}</p>
                    </div>
                    <div className={styles.col}>
                        <p className={styles.receiptTextBod}>MVA</p>
                        <p>{calculateVat(state.totalPrice).vat}</p>
                    </div>
                    <div className={styles.col}>
                        <p className={styles.receiptTextBod}>Totalt</p>
                        <p>{state.totalPrice}</p>
                    </div>
                </div>
                <div className={styles.receiptFooter}>
                    <p className={styles.receiptTextBod}>Takk for besøket</p>
                    <p className={styles.receiptTextBod}>Velkommen igjen!</p>
                </div>
            </div>
            <div className={styles.btnContainer}>
                {/* TODO ADD IconButton */}
                <PrimaryButton onClick={handlePrint} text="Skriv ut" color="secondary" />
                {/* Use another butten to go back to meny */}
                <PrimaryButton onClick={() => navigate("/")} text="Meny " color="primary" />
            </div>
        </div>

    );
};

export default Receipt;