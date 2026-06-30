import { IBuyer, TPayment, TBuyerErrors } from "../../types/index";

export class Buyer {
    protected data: IBuyer;

    constructor() {
        this.data = {
            payment: "",
            address: "",
            email: "",
            phone: "",
        }
    }

    savePaymentMethod(payment: TPayment): void {
        this.data.payment = payment;
    }

    saveAddress(address: string): void {
        this.data.address = address;
    }

    savePhone(phone: string): void {
        this.data.phone = phone;
    }

    saveEmail(email: string): void {
        this.data.email = email;
    }

    getBuyer(): IBuyer {
        return this.data;
    }

    clearingBuyer(): void {
        this.data = {
            payment: "",
            address: "",
            email: "",
            phone: "",
        };
    }

    validateBuyer(): TBuyerErrors {
        const error = {
            payment: "",
            address: "",
            email: "",
            phone: "",
        };

        if(!this.data.payment.trim()) {
            error.payment = "Укажите вид оплаты";
        }

        if(!this.data.address.trim()) {
            error.address = "Укажите адрес доставки";
        }

         if(!this.data.phone.trim()) {
            error.phone = "Укажите контактный номер телефона";
        }

         if(!this.data.email.trim()) {
            error.email = "Укажите электронную почту";
        }

        return error;
    }
}