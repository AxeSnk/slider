import EventEmitter from "../EventEmitter";
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

  addSlider(): Slider {
    return new Slider(this.root);
  }

  addFill(): Fill {
    return new Fill(this.slider.getElement());
  }

  addOnHandles(state: IOptions): void {
      this.handles[0].on("drag_0", this.emitDrag.bind(this));
      this.handles[1].on("drag_1", this.emitDrag.bind(this));
  }

  addHandles(state: IOptions): void {
    this.handles = [];

      this.handles.push(new Handle(this.slider.getElement(), 0));
      this.handles.push(new Handle(this.slider.getElement(), 1));
  }

  emitDrag(left: object): void {
    this.emit("dragHandle", left);
  }

  renderFill(state: IOptions): void {
    if (state.range) {
      this.fill.renderRangeFill(
        state,
        this.handles[0].getPositionHandle(state),
        this.handles[1].getPositionHandle(state),
        this.handles[0].getPositionHandle(state) - this.slider.getPosition(state),
        this.handles[1].getPositionHandle(state) -
          this.handles[0].getPositionHandle(state) +
          this.handles[0].getWidth() / 2
      );
    } else {
      this.fill.renderFill(
        state,
        this.handles[0].getPositionHandle(state) - this.slider.getPosition(state)
      );
    }
  }

  renderHandle(state: IOptions, sliderLenght: number): void {

    if (state.range) {
      this.handles[1].getHandle().setAttribute("style", "display: flex");

      this.handles[0].renderHandle(
        state.val,
        state.minVal,
        state.maxVal,
        state.vertical,
        sliderLenght
      );  
      this.handles[1].renderHandle(
        state.valEnd,
        state.minVal,
        state.maxVal,
        state.vertical,
        sliderLenght
      );
    } else { 
      if(this.handles[1]) {
        this.handles[1].getHandle().setAttribute("style", "display: none");
      }

      this.handles[0].renderHandle(
        state.val,
        state.minVal,
        state.maxVal,
        state.vertical,
        sliderLenght
      );
  
    }
  }

  renderTooltip(state: IOptions, handleHeight: number): void {
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

  renderSlider(state: IOptions): void {
    this.slider.render(state);
  }

  getLenhgtSlider(state: IOptions): number {
    return this.slider.getLength(state);
  }

  getHandleWidth(): number {
    return this.handles[0].getWidth();
  }

  getHandleHeight(): number {
    return this.handles[0].getHeight();
  }

  getPositionHandle(state: IOptions, id: number): number {
    return this.handles[id].getPositionHandle(state);
  }

}

export default View;
