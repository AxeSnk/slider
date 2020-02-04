import EventEmitter from "../eventEmitter";

import Slider from "./slider/slider";
import Handle from "./handle/handle";
import Fill from "./fill/fill";
import Scale from "./scale/scale";

export default class View extends EventEmitter {
  private root: HTMLElement;
  private slider: Slider;
  private fill: Fill;
  private handles: Handle[];
  private scale: Scale;

  constructor(root: HTMLElement) {
    super();

    this.root = root;
    this.slider = this.addSlider();
    this.fill = this.addFill();
    this.scale = this.addScale();
  }

  public setPositionHandle(
    id: number,
    vertical: boolean,
    value: number,
    shift: number,
    sliderHeight: number,
    sliderWidth: number,
    difference: number,
    step: number
  ): void {
    this.handles[id].setPosition(
      vertical,
      value,
      shift,
      sliderHeight,
      sliderWidth,
      difference,
      step
    );
  }

  private addSlider(): Slider {
    return new Slider(this.root);
  }

  private addFill(): Fill {
    return new Fill(this.slider.getElement());
  }

  public addOnHandles(state): void {
    if (state.range) {
      this.handles[0].on("drag_0", this.emitDrag.bind(this));
      this.handles[1].on("drag_1", this.emitDrag.bind(this));
    } else {
      this.handles[0].on("drag_0", this.emitDrag.bind(this));
    }
  }

  public addHandles(state): void {
    this.handles = [];
    this.handles.push(new Handle(this.slider.getElement(), 0));

    if (state.range) {
      this.handles.push(new Handle(this.slider.getElement(), 1));
    }
  }

  private addScale(): Scale {
    return new Scale(this.slider.getElement());
  }

  private emitDrag(left: object): void {
    this.emit("dragHandle", left);
  }

  public renderScale(arrrayOfDivisions: number[]): void {
    this.scale.render(arrrayOfDivisions);
  }

  public renderFill(state): void {
    if (state.range) {
      this.fill.renderRangeFill(
        this.handles[0].getPositionHandle(),
        this.handles[1].getPositionHandle(),
        this.handles[0].getPositionX() - this.slider.getPositionX(),
        this.handles[1].getPositionX() -
          this.handles[0].getPositionX() +
          this.handles[0].getWidth() / 2,
        this.slider.getWidth()
      );
    } else {
      this.fill.renderFill(
        this.handles[0].getPositionX() -
          this.slider.getPositionX() +
          this.handles[0].getWidth() / 2
      );
    }
  }

  public makeVerticalFill(state): void {
    if (state.range) {
      this.fill.makeVertical(
        this.handles[0].getPositionY() - this.slider.getPositionY(),
        this.handles[1].getPositionY() -
          this.handles[0].getPositionY() +
          this.handles[0].getWidth() / 2
      );
    } else {
      this.fill.makeVertical(
        0,
        this.handles[0].getPositionY() -
          this.slider.getPositionY() +
          this.handles[0].getWidth() / 2
      );
    }
  }

  public renderHandle(state, sliderWidth: number, sliderHeight: number): void {
    this.handles[0].renderHandle(
      state.val,
      state.minVal,
      state.maxVal,
      state.vertical,
      sliderWidth,
      sliderHeight
    );
    if (state.range) {
      this.handles[1].renderHandle(
        state.valEnd,
        state.minVal,
        state.maxVal,
        state.vertical,
        sliderWidth,
        sliderHeight
      );
    }
  }

  public renderTooltip(state, handleHeight: number): void {
    this.handles[0].renderTooltip(state.val, state.minVal, state.maxVal, state.vertical, handleHeight);
    if (state.range) {
      this.handles[1].renderTooltip(state.valEnd, state.minVal, state.maxVal, state.vertical, handleHeight);
    }
  }

  public makeHorizontalScale(): void {
    this.scale.makeHorizontal(
      this.slider.getWidth(),
      this.handles[0].getWidth()
    );
  }

  public makeVerticalScale(): void {
    this.scale.makeVertical(
      this.slider.getHeight(),
      this.handles[0].getHeight()
    );
  }

  public makeVerticalSlider(): void {
    this.slider.makeVertical();
  }

  public updateHandles(
    state,
    sliderHeight: number,
    sliderWidth: number,
    posOther: number | null,
    id: number
  ): void {
    if (state.range) {
      if (id == 0) {
        this.handles[0].updateHandle(
          state.vertical,
          sliderHeight,
          sliderWidth,
          posOther
        );
      } else {
        this.handles[1].updateHandle(
          state.vertical,
          sliderHeight,
          sliderWidth,
          posOther
        );
      }
    } else {
      this.handles[0].updateHandle(
        state.vertical,
        sliderHeight,
        sliderWidth,
        posOther
      );
    }
  }

  public updateTooltip(
    state: any,
    handleHeight: number,
    position: number,
    width: number,
    id: number,
    posOther: number | null
  ): void {
    if (state.range) {
      this.handles[id].updateTooltip(
        state,
        handleHeight,
        position,
        width,
        id,
        posOther
      );
    } else {
      this.handles[0].updateTooltip(
        state,
        handleHeight,
        position,
        width,
        id,
        posOther
      );
    }
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

  public getPositionHandle(id: number): number {
    return this.handles[id].getPositionHandle();
  }
}
