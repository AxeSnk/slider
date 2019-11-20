import Model from "./model";
import IOptions from './defaultOptions';

export interface IView {
  getSlider(): HTMLDivElement;
  getHandle(): HTMLDivElement;
}

export default class View implements IView {
  private slider: HTMLDivElement;
  private handle: HTMLDivElement;
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

  getSlider(): HTMLDivElement {
    return this.slider;
  }

  getHandle(): HTMLDivElement {
    return this.handle;
  }
}