import EventEmitter from "../EventEmitter";
import IOptions from "../defaultOptions";
import Slider from "./Slider/Slider";
import Handle from "./Handle/Handle";
import Fill from "./Fill/Fill";
import Scale from "./Scale/Scale";

class View extends EventEmitter {
  private root: HTMLElement;
  private slider: Slider;
  private fill: Fill;
  private handles: Array<Handle>;
  private scale: Scale;

  constructor(root: HTMLElement) {
    super();

    this.root = root;
    this.slider = this.addSlider();
    this.fill = this.addFill();
    this.handles = [];
    this.scale = this.addScale();
    this.addHandles();
    this.addOnHandles();
    this.addOnSlider();
    this.addOnScale();
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

  addScale(): any {
    return new Scale(this.slider.getElement());
  }

  addOnHandles(): void {
    this.handles[0].on("drag_0", this.emitDrag.bind(this));
    this.handles[1].on("drag_1", this.emitDrag.bind(this));
  }

  addOnSlider(): void {
    this.slider.on("clickSlider", this.emitClick.bind(this));
  }

  addOnScale(): void {
    this.scale.on("clickScaleVal", this.emitScaleVal.bind(this));
    this.scale.on("clickScaleValEnd", this.emitScaleValEnd.bind(this));
  }

  emitDrag(left: object): void {
    this.emit("dragHandle", left);
  }

  emitClick(left: object): void {
    this.emit("clickSlider", left);
  }

  emitScaleVal(val: object): void {
    this.emit('clickScaleVal', val);
  }

  emitScaleValEnd(valEnd: object): void {
    this.emit('clickScaleValEnd', valEnd);
  }

  renderFill(state: IOptions): void {
    this.fill.renderFill(
      state,
      this.handles[0].getPositionHandle(state),
      this.handles[1].getPositionHandle(state),
      this.slider.getPosition(state),
      this.slider.getLength(state)
    );
  }

  renderHandle(state: IOptions): void {
    if (state.range) {
      this.handles[1].getHandle().setAttribute("style", "display: flex");

      this.handles[0].renderHandle(
        state.val,
        state.minVal,
        state.maxVal,
        state.vertical
      );
      this.handles[1].renderHandle(
        state.valEnd,
        state.minVal,
        state.maxVal,
        state.vertical
      );
    } else {
      if (this.handles[1]) {
        this.handles[1].getHandle().setAttribute("style", "display: none");
        this.handles[1].renderHandle(
          state.valEnd,
          state.minVal,
          state.maxVal,
          state.vertical
        );
      }

      this.handles[0].renderHandle(
        state.val,
        state.minVal,
        state.maxVal,
        state.vertical
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

  renderScale(state: IOptions): void {
    this.scale.render(state);
  }

  getLengthSlider(state: IOptions): number {
    return this.slider.getLength(state);
  }

  getPositionSlider(state: IOptions): number {
    return this.slider.getPosition(state);
  }

  getPositionHandle(state: IOptions, id: number): number {
    return this.handles[id].getPositionHandle(state);
  }
}

export default View;
