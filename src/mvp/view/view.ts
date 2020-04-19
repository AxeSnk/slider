import EventEmitter from "../EventEmitter";
import IOptions from "../defaultOptions";
import Slider from "./Slider/Slider";
import Handle from "./Handle/Handle";
import Fill from "./Fill/Fill";

class View extends EventEmitter {
  private root: HTMLElement;
  private slider: Slider;
  private fill: Fill;
  private handles: [] | any;

  constructor(root: HTMLElement) {
    super();

    this.root = root;
    this.slider = this.addSlider();
    this.fill = this.addFill();
    this.handles = [];
    this.addHandles();
    this.addOnHandles();
  }

  addSlider(): Slider {
    return new Slider(this.root);
  }

  addFill(): Fill {
    return new Fill(this.slider.getElement());
  }

  addHandles(): any {
    this.handles.push(new Handle(this.slider.getElement(), 0));
    this.handles.push(new Handle(this.slider.getElement(), 1));
  }

  addOnHandles(): void {
    this.handles[0].on("drag_0", this.emitDrag.bind(this));
    this.handles[1].on("drag_1", this.emitDrag.bind(this));
  }

  emitDrag(left: object): void {
    this.emit("dragHandle", left);
  }

  renderFill(state: IOptions): void {
    this.fill.renderFill(
      state,
      this.handles[0].getPositionHandle(state),
      this.handles[1].getPositionHandle(state),
      this.slider.getPosition(state)
    );
  }

  renderHandle(state: IOptions, sliderLength: number): void {
    if (state.range) {
      this.handles[1].getHandle().setAttribute("style", "display: flex");

      this.handles[0].renderHandle(
        state.val,
        state.minVal,
        state.maxVal,
        state.vertical,
        sliderLength
      );
      this.handles[1].renderHandle(
        state.valEnd,
        state.minVal,
        state.maxVal,
        state.vertical,
        sliderLength
      );
    } else {
      if (this.handles[1]) {
        this.handles[1].getHandle().setAttribute("style", "display: none");
      }

      this.handles[0].renderHandle(
        state.val,
        state.minVal,
        state.maxVal,
        state.vertical,
        sliderLength
      );
    }
  }

  renderTooltip(state: IOptions): void {
    this.handles[0].renderTooltip(
      state.tooltip,
      state.val,
      state.minVal,
      state.maxVal,
      state.vertical
    );
    if (state.range) {
      this.handles[1].renderTooltip(
        state.tooltip,
        state.valEnd,
        state.minVal,
        state.maxVal,
        state.vertical
      );
    }
  }

  renderSlider(state: IOptions): void {
    this.slider.render(state);
  }

  getLengthSlider(state: IOptions): number {
    return this.slider.getLength(state);
  }

  getPositionHandle(state: IOptions, id: number): number {
    return this.handles[id].getPositionHandle(state);
  }
}

export default View;
