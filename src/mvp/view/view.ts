import EventEmitter from '../eventEmitter';

import Slider from './slider/slider';
import Handle from './handle/handle';
import Fill from './fill/fill';
import Scale from './scale/scale';

export interface IView extends EventEmitter {
  updateHandles(value: number, valEnd: number, shift: number, range: number, sliderWidth: number, step: number, vertical: boolean, sliderHeight: number, id: number): void;
  updateTooltip(minVal: number, maxVal: number, handleHeight: number, position: number, width: number, vertical: boolean): void;

  makeVerticalSlider(): void;
  makeVerticalFill(): void;
  makeVerticalScale(): void;

  renderFill(): void
  renderHandle(sliderWidth: number, value: number, valEnd: number, shift: number, difference: number, vertical: boolean, sliderHeight: number): void;
  renderTooltip(val: number, valEnd: number, minVal: number, maxVal: number, handleHeight: number, vertical: boolean): void;
  renderScale(arrrayOfDivisions: number[], sliderWidth: number, handleWidth: number): void;

  getHeight(): number;
  getWidth(): number;
  getHandleWidth(): number;
  getHandleHeight(): number;
  getPositionHandle(id: number): number;

  setRange(): boolean;
  addHandles(): void;
  addOnHandles(): void
}

export default class View extends EventEmitter implements IView {

  private root: HTMLElement;
  private slider: Slider;
  private fill: Fill;
  private handles: Handle[];
  private scale: Scale;
  private range: boolean = false;
  
  constructor(root: HTMLElement) {
    super();

    this.root = root;
    this.slider = this.addSlider();
    this.fill = this.addFill();
    this.scale = this.addScale();
  }

  public setRange(): boolean {
    return this.range = true;
  }

  private addSlider(): Slider {
    return new Slider(this.root);
  }
  
  private addFill(): Fill {
    return new Fill(this.slider.getElement());
  }

  public addOnHandles(): void {
    if (this.range) {
      this.handles[0].on('drag_0', this.emitDrag.bind(this));
      this.handles[1].on('drag_1', this.emitDrag.bind(this));
    } else {
      this.handles[0].on('drag_0', this.emitDrag.bind(this));
    }
  }

  public addHandles(): void {
    this.handles = [];
    this.handles.push(new Handle(this.slider.getElement(), 0));

    if (this.range) {
      this.handles.push(new Handle(this.slider.getElement(), 1));
    }
  }

  private addScale(): Scale {
    return new Scale(this.slider.getElement());
  }

  private emitDrag( left: object ): void {
    this.emit('dragHandle', left);
  }

  public renderFill(): void {
    if (this.range) {
      this.fill.renderRangeFill(this.handles[0].getPositionX() - this.slider.getPositionX(), this.handles[1].getPositionX() - this.handles[0].getPositionX() + (this.handles[0].getWidth() / 2));
    } else {
      this.fill.renderFill(this.handles[0].getPositionX() - this.slider.getPositionX() + (this.handles[0].getWidth() / 2));
    }
  }

  public renderHandle(sliderWidth: number, value: number, valEnd: number, shift: number, difference: number, vertical: boolean, sliderHeight: number): void {
    this.handles[0].renderHandle(sliderWidth, value, shift, difference, vertical, sliderHeight);
    if (this.range) {
      this.handles[1].renderHandle(sliderWidth, valEnd, shift, difference, vertical, sliderHeight);
    }
  }

  public renderTooltip(val: number, valEnd: number, minVal: number, maxVal: number, handleHeight: number, vertical: boolean): void {
    this.handles[0].renderTooltip(val, minVal, maxVal, handleHeight, vertical)
    if (this.range) {
      this.handles[1].renderTooltip(valEnd, minVal, maxVal, handleHeight, vertical)
    }
  }

  public makeVerticalScale(): void {
    this.scale.makeVertical(this.slider.getHeight(), this.handles[0].getHeight());
  }

  public makeVerticalSlider(): void {
    this.slider.makeVertical();
  }

  public makeVerticalFill(): void {
    this.fill.makeVertical(this.handles[0].getPositionY() - this.slider.getPositionY() + (this.handles[0].getWidth() / 2), );
    if (this.range) {
      this.fill.makeVertical(this.handles[1].getPositionY() - this.slider.getPositionY() + (this.handles[1].getWidth() / 2), );
    }

  }

  public updateHandles(value: number, valEnd: number, shift: number, difference: number, sliderWidth: number, step: number, vertical: boolean, sliderHeight: number, id: number): void {
    if (this.range) {
      if (id == 0) {
        this.handles[0].updateHandle(value, shift, difference, sliderWidth, step, vertical, sliderHeight);
      } else {
        this.handles[1].updateHandle(valEnd, shift, difference, sliderWidth, step, vertical, sliderHeight);
      }
    } else {
      this.handles[0].updateHandle(value, shift, difference, sliderWidth, step, vertical, sliderHeight);
    }
  }

  public updateTooltip(minVal: number, maxVal: number, handleHeight: number, position: number, width: number, vertical: boolean): void {
    this.handles[0].updateTooltip(minVal, maxVal, handleHeight, position, width, vertical);
    if(this.range) {
      this.handles[1].updateTooltip(minVal, maxVal, handleHeight, position, width, vertical);
    }
  }

  public renderScale(arrrayOfDivisions: number[], sliderWidth: number, handleWidth: number): void {
    this.scale.renderScale(arrrayOfDivisions, sliderWidth, handleWidth);
  }

  public getHeight(): number {
    return this.slider.getHeight();
  }

  public getWidth(): number {
    return this.slider.getWidth();
  }

  public getHandleWidth(): number {
    return this.handles[0].getWidth();
  }

  public getHandleHeight(): number {
    return this.handles[0].getHeight();
  }

  public getPositionHandle(id): number {
    return this.handles[id].getPositionHandle();
  }

}