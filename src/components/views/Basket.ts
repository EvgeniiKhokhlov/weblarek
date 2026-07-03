import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
  items: HTMLElement[];
  price: number;
}

export class Basket extends Component<IBasket> {

    protected basketListProducts: HTMLElement;
    protected checkoutButton: HTMLButtonElement;
    protected priceElement: HTMLElement;


  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.basketListProducts = ensureElement<HTMLElement>('.basket__list', this.container);
    this.checkoutButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.priceElement = ensureElement<HTMLElement>('.basket__price', this.container);

    this.checkoutButton.addEventListener('click', () => {
      this.events.emit('order:open');
    });
  }

  set list(value: HTMLElement[]) {
    this.basketListProducts.innerHTML = '';
    if (value.length === 0) {
      this.basketListProducts.innerHTML = '<p class="basket__empty">Корзина пуста</p>';
    } else {
      this.basketListProducts.append(...value);
    }
  }

  set price(value: number) {
    this.priceElement.textContent = `${value} синапсов`;
  }

  setBasketStatus(isEmpty: boolean) {
    this.checkoutButton.disabled = isEmpty;
    this.checkoutButton.classList.toggle('button_disabled', isEmpty);
  }
}