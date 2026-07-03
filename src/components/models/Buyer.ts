import { IBuyer, TPayment, TBuyerErrors } from "../../types/index";
import { IEvents } from "../base/Events";

export class Buyer {
    protected data: IBuyer;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
        this.data = {
            payment: "",
            address: "",
            email: "",
            phone: "",
        }
    }

    savePaymentMethod(payment: TPayment): void {
        this.events.emit('buyer-data:changed', { field: 'payment' });
        this.data.payment = payment;
    }

    saveAddress(address: string): void {
        this.data.address = address;
        this.events.emit('buyer-data:changed', { field: 'address' });
    }

    savePhone(phone: string): void {
        this.data.phone = phone;
        this.events.emit('buyer-data:changed', { field: 'phone' });
    }

    saveEmail(email: string): void {
        this.data.email = email;
        this.events.emit('buyer-data:changed', { field: 'email' });
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