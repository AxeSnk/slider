import EventEmitter from '../eventEmitter';
import createElement from '../utility';

import Handle from './handle/handle';
import Fill from './fill/fill';
import Scale from './scale/scale';

export interface IView extends EventEmitter {
  addHandles(value: number, shift: number, range: number, sliderWidth: number): void;
  addFill(): void;
  addScale(arrrayOfDivisions: number[], sliderWidth: number, handleWidth: number): void;

  renderTooltip(val: number, minVal: number, maxVal: number, handleHeight: number): void;

  updateHandles(value: number, shift: number, range: number, sliderWidth: number): void;
  updateFill(): void;

  getWidth(): number;
  getHandleWidth(): number;
  getHandleHeight(): number;
}

export default class View extends EventEmitter implements IView {

  private root: HTMLElement;
  private slider: HTMLElement;
  private fill: Fill;
  private handle: Handle;
  private scale: Scale;
  
  constructor(root: HTMLElement) {
    super();

    this.root = root;
    this.slider = this.createSlider();
  }

  emitDrag(leftX: number): void {
    this.emit('dragHandle', leftX);
  }
  
  addHandles(value: number, shift: number, range: number, sliderWidth: number): void {
    this.handle = new Handle(this.slider);
    this.handle.renderHandle(value, shift, range, sliderWidth);
    this.handle.on('drag', this.emitDrag.bind(this));
  }

  renderTooltip(val: number, minVal: number, maxVal: number, handleHeight: number): void {
    this.handle.renderTooltip(val, minVal, maxVal, handleHeight);
  }

  addFill(): void {
    this.fill = new Fill(this.slider);
    this.fill.renderFill(this.handle.getPosition() - this.slider.getBoundingClientRect().left + (this.handle.getWidth() / 2));
  }

  addScale(arrrayOfDivisions: number[], sliderWidth: number, handleWidth: number): void {
    this.scale = new Scale(this.slider);
    this.scale.renderScale(arrrayOfDivisions, sliderWidth, handleWidth);
  }

  updateHandles(value: number, shift: number, range: number, sliderWidth: number): void {
    this.handle.renderHandle(value, shift, range, sliderWidth);
  }

  updateFill(): void {
    this.fill.renderFill(this.handle.getPosition() - this.slider.getBoundingClientRect().left + (this.handle.getWidth() / 2));
  }

  private createSlider(): HTMLElement {
    let slider = createElement('div', { class: 'slider' });
    this.root.appendChild(slider);

    return slider;
  }


  getWidth(): number {
    return this.slider.offsetWidth;
  }

  getHandleWidth(): number {
    return this.handle.getWidth();
  }

  getHandleHeight(): number {
    return this.handle.getHeight();
  }

}