import EventEmitter from "../eventEmitter";
import IOptions from "../defaultOptions";

import Slider from "./Slider/Slider";
import Handle from "./Handle/Handle";
import Fill from "./Fill/Fill";

class View extends EventEmitter {
  private root: HTMLElement;
  private slider: Slider;
  private fill: Fill;
  private handles: Handle[];

  constructor(root: HTMLElement) {
    super();

    this.root = root;
    this.slider = this.addSlider();
    this.fill = this.addFill();
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

  private emitDrag(left: object): void {
    this.emit("dragHandle", left);
  }

  public renderFill(state: IOptions): void {
    if (state.range) {
      this.fill.renderRangeFill(
        state,
        this.handles[0].getPositionHandle(),
        this.handles[1].getPositionHandle(),
        this.handles[0].getPosition(state) - this.slider.getPosition(state),
        this.handles[1].getPosition(state) -
          this.handles[0].getPosition(state) +
          this.handles[0].getWidth() / 2
      );
    } else {
      this.fill.renderFill(
        state,
        this.handles[0].getPosition(state) - this.slider.getPosition(state)
      );
    }
  }

  public renderHandle(state, sliderLenght: number): void {
    this.handles[0].renderHandle(
      state.val,
      state.minVal,
      state.maxVal,
      state.vertical,
      sliderLenght
    );
    if (state.range) {
      this.handles[1].renderHandle(
        state.valEnd,
        state.minVal,
        state.maxVal,
        state.vertical,
        sliderLenght
      );
    }
  }

  public renderTooltip(state: IOptions, handleHeight: number): void {
    this.handles[0].renderTooltip(
      state.tooltip,
      state.val,
      state.minVal,
      state.maxVal,
      state.vertical,
      handleHeight
    );
    if (state.range) {
      this.handles[1].renderTooltip(
        state.tooltip,
        state.valEnd,
        state.minVal,
        state.maxVal,
        state.vertical,
        handleHeight
      );
    }
  }

  public renderSlider(state: IOptions): void {
    this.slider.render(state);
  }

  public updateHandles(
    state: IOptions,
    sliderLenght: number,
    posOther: number | null,
    id: number
  ): void {
    if (state.range) {
      if (id == 0) {
        this.handles[0].updateHandle(state.vertical, sliderLenght, posOther);
      } else {
        this.handles[1].updateHandle(state.vertical, sliderLenght, posOther);
      }
    } else {
      this.handles[0].updateHandle(state.vertical, sliderLenght, posOther);
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

export default View;
