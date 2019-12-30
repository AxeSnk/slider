import EventEmitter from '../eventEmitter';

import Slider from './slider/slider';
import Handle from './handle/handle';
import Fill from './fill/fill';
import Scale from './scale/scale';

export interface IView extends EventEmitter {
  renderHandles(value: number, shift: number, range: number, sliderWidth: number): void;
  renderFill(): void
  renderTooltip(val: number, minVal: number, maxVal: number, handleHeight: number): void;
  renderScale(arrrayOfDivisions: number[], sliderWidth: number, handleWidth: number): void;

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
    this.slider = this.addSlider();
    this.fill = this.addFill();
    this.handle = this.addHandles();
    this.handle.on('drag', this.emitDrag.bind(this));
    this.scale = this.addScale();
  }

  private addSlider(): Slider {
    return new Slider(this.root);
  }
  
  private addFill(): Fill {
    return new Fill(this.slider.getElement());
  }

  private addHandles(): Handle {
    return new Handle(this.slider.getElement());
  }

  private addScale(): Scale {
    return new Scale(this.slider.getElement());
  }

  private emitDrag(leftX: number): void {
    this.emit('dragHandle', leftX);
  }

  public renderFill(): void {
    this.fill.renderFill(this.handle.getPosition() - this.slider.getPosition() + (this.handle.getWidth() / 2));
  }

  public renderHandles(value: number, shift: number, difference: number, sliderWidth: number): void {
    this.handle.renderHandle(value, shift, difference, sliderWidth);
  }

  public renderTooltip(val: number, minVal: number, maxVal: number, handleHeight: number): void {
    this.handle.renderTooltip(val, minVal, maxVal, handleHeight);
  }

  public renderScale(arrrayOfDivisions: number[], sliderWidth: number, handleWidth: number): void {
    this.scale.renderScale(arrrayOfDivisions, sliderWidth, handleWidth);
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