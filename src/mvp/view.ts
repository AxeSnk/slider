import Model from "./model";
import IOptions from './defaultOptions';

export interface IView {
  slider: HTMLDivElement;
  handle: HTMLDivElement;
}

export default class View {
  slider: HTMLDivElement;
  handle: HTMLDivElement;
  private tooltip?: HTMLDivElement;

  constructor(slider: HTMLDivElement) {
    this.slider = slider;
    this.init();

    if (true) {
      this.handle = this.createHandle();
    }
  }

  init(): void {
    this.slider.classList.add('slider');
  }

  createHandle(): HTMLDivElement {
    let handle = document.createElement('div');
    handle.classList.add('handle');
    this.slider.appendChild(handle);

    return handle;
  }


}