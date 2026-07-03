import { Component } from "../base/Component";

interface IGallery {
  update: HTMLElement[];
}

export class Gallery extends Component<IGallery> {

  constructor(container: HTMLElement) {
    super(container);
  }

  set update(items: HTMLElement[]) {
    this.container.innerHTML = '';
    this.container.append(...items);
  }
}