import {CartItem} from "@/type/cartItem";

export type PaymentParams = {
    cartItems: CartItem[];
    pickUpTime: string;
    paymentDescription: string;
    totalPrice: number;
};