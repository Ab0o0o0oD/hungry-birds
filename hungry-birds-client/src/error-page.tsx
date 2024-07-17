import styles from "@/styles/modules/errorPage.module.scss";
import { useNavigate, useRouteError } from "react-router-dom";
import { PrimaryButton } from "./components/buttons/primary-button/PrimaryButton";

interface RouteError {
    statusText?: string;
    message?: string;
}

export default function ErrorPage() {
    const error = useRouteError() as RouteError;
    console.error(error);
    const navigate = useNavigate()
    return (
        <div id="error-page" className={styles.errorContainer}>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <PrimaryButton  text="Go back to home" onClick={()=>  navigate("/")} color="primary"/>
        </div>
    );
}