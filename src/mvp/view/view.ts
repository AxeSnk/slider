import EventEmitter from "../eventEmitter";

import Slider from "./slider/slider";
import Handle from "./handle/handle";
import Fill from "./fill/fill";
import Scale from "./scale/scale";
import IOptions from "../defaultOptions";

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
    sliderLenght: number,
    difference: number,
    step: number
  ): void {
    this.handles[id].setPosition(
      vertical,
      value,
      shift,
      sliderLenght,
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

  public renderScale(state: IOptions): void {
    this.scale.render(state);
  }

  public renderFill(state): void {
    if (state.range) {
      this.fill.renderRangeFill(
        this.handles[0].getPositionHandle(),
        this.handles[1].getPositionHandle(),
        this.handles[0].getPositionX() - this.slider.getPosition(state),
        this.handles[1].getPositionX() -
          this.handles[0].getPositionX() +
          this.handles[0].getWidth() / 2,
        this.slider.getLength(state)
      );
    } else {
      this.fill.renderFill(
        this.handles[0].getPositionX() -
          this.slider.getPosition(state) +
          this.handles[0].getWidth() / 2
      );
    }
  }

  public makeVerticalFill(state): void {
    if (state.range) {
      this.fill.makeVertical(
        this.handles[0].getPositionY() - this.slider.getPosition(state),
        this.handles[1].getPositionY() -
          this.handles[0].getPositionY() +
          this.handles[0].getWidth() / 2
      );
    } else {
      this.fill.makeVertical(
        0,
        this.handles[0].getPositionY() -
          this.slider.getPosition(state) +
          this.handles[0].getWidth() / 2
      );
    }
  }

  public renderHandle(state, sliderLenght: number): void {
    this.handles[0].renderHandle(
      state.val,
      state.minVal,
      state.maxVal,
      state.vertical,
      sliderLenght,
    );
    if (state.range) {
      this.handles[1].renderHandle(
        state.valEnd,
        state.minVal,
        state.maxVal,
        state.vertical,
        sliderLenght,
      );
    }
  }

  public renderTooltip(state, handleHeight: number): void {
    this.handles[0].renderTooltip(state.val, state.minVal, state.maxVal, state.vertical, handleHeight);
    if (state.range) {
      this.handles[1].renderTooltip(state.valEnd, state.minVal, state.maxVal, state.vertical, handleHeight);
    }
  }

  setOrientationScale(state: IOptions): void {
    this.scale.setOrientation(state, this.slider.getLength(state), this.handles[0].getWidth())
  }

  public setOrientationSlider(state): void {
    this.slider.setOrientation(state);
  }

  public updateHandles(
    state,
    sliderLenght: number,
    posOther: number | null,
    id: number
  ): void {
    if (state.range) {
      if (id == 0) {
        this.handles[0].updateHandle(
          state.vertical,
          sliderLenght,
          posOther
        );
      } else {
        this.handles[1].updateHandle(
          state.vertical,
          sliderLenght,
          posOther
        );
      }
    } else {
      this.handles[0].updateHandle(
        state.vertical,
        sliderLenght,
        posOther
      );
    }
  }

  public updateTooltip(
    state: any,
    handleHeight: number,
    position: number,
    sliderLenght: number,
    id: number,
    posOther: number | null
  ): void {
    if (state.range) {
      this.handles[id].updateTooltip(
        state,
        handleHeight,
        position,
        sliderLenght,
        id,
        posOther
      );
    } else {
      this.handles[0].updateTooltip(
        state,
        handleHeight,
        position,
        sliderLenght,
        id,
        posOther
      );
    }
  }

  getLenhgtSlider(state): number {
    return this.slider.getLength(state);
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
