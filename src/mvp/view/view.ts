import EventEmitter from '../eventEmitter';

import Slider from './slider/slider';
import Handle from './handle/handle';
import Fill from './fill/fill';
import Scale from './scale/scale';

export interface IView extends EventEmitter {
  addSlider(): void;
  addHandles(value: number, shift: number, range: number, sliderWidth: number): void;
  addFill(): void;
  addScale(arrrayOfDivisions: number[], sliderWidth: number, handleWidth: number): void;

  updateHandles(value: number, shift: number, range: number, sliderWidth: number): void;
  updateFill(): void;

  renderTooltip(val: number, minVal: number, maxVal: number, handleHeight: number): void;

  getWidth(): number;
  getHandleWidth(): number;
  getHandleHeight(): number;
}

export default class View extends EventEmitter implements IView {

  private root: HTMLElement;
  private slider: Slider;
  private fill: Fill;
  private handle: Handle;
  private scale: Scale;
  
  constructor(root: HTMLElement) {
    super();

    this.root = root;
  }

  private emitDrag(leftX: number): void {
    this.emit('dragHandle', leftX);
  }

  public addSlider(): void {
    this.slider = new Slider(this.root);
  }
  
  public addHandles(value: number, shift: number, range: number, sliderWidth: number): void {
    this.handle = new Handle(this.slider.getElement());
    this.handle.renderHandle(value, shift, range, sliderWidth);
    this.handle.on('drag', this.emitDrag.bind(this));
  }

  public addFill(): void {
    this.fill = new Fill(this.slider.getElement());
    this.fill.renderFill(this.handle.getPosition() - this.slider.getPosition() + (this.handle.getWidth() / 2));
  }

  public addScale(arrrayOfDivisions: number[], sliderWidth: number, handleWidth: number): void {
    this.scale = new Scale(this.slider.getElement());
    this.scale.renderScale(arrrayOfDivisions, sliderWidth, handleWidth);
  }

  public updateHandles(value: number, shift: number, range: number, sliderWidth: number): void {
    this.handle.renderHandle(value, shift, range, sliderWidth);
  }

  public updateFill(): void {
    this.fill.renderFill(this.handle.getPosition() - this.slider.getPosition() + (this.handle.getWidth() / 2));
  }

  public renderTooltip(val: number, minVal: number, maxVal: number, handleHeight: number): void {
    this.handle.renderTooltip(val, minVal, maxVal, handleHeight);
  }

  public getWidth(): number {
    return this.slider.getWidth();
  }

  public getHandleWidth(): number {
    return this.handle.getWidth();
  }

  public getHandleHeight(): number {
    return this.handle.getHeight();
  }

}