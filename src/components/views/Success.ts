import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";


interface ISuccess {
  total: number;
}

interface ISuccessActions {
  onClick: () => void;
}

export class Success extends Component<ISuccess> {
  protected closeButton: HTMLButtonElement;
  protected totalElement: HTMLElement;

  constructor(container: HTMLElement, actions: ISuccessActions) {
    super(container);

    this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
    this.totalElement = ensureElement<HTMLElement>('.order-success__description', this.container);

    if (actions?.onClick) {
      this.closeButton.addEventListener('click', actions.onClick);
    }
  }

  set total(value: number) {
    this.totalElement.textContent = `Списано ${value} синапсов`;
  }
}