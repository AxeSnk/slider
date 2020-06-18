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

  public renderFill(state: IOptions): void {
    this.fill.renderFill(
      state,
      this.handles[0].getPositionHandle(state),
      this.handles[1].getPositionHandle(state),
      this.slider.getPosition(state),
      this.slider.getLength(state)
    );
  }

  public renderHandle(state: IOptions): void {
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
        this.handles[1].getHandle().setAttribute("style", "display: none");
        this.handles[1].renderHandle(
          state.valEnd,
          state.minVal,
          state.maxVal,
          state.vertical
        )
      }

      this.handles[0].renderHandle(
        state.val,
        state.minVal,
        state.maxVal,
        state.vertical
      );
    
  }

  public renderTooltip(state: IOptions): void {
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

  public renderSlider(state: IOptions): void {
    this.slider.render(state);
  }

  public renderScale(state: IOptions): void {
    this.scale.render(state);
  }

  public getLengthSlider(state: IOptions): number {
    return this.slider.getLength(state);
  }

  public getPositionSlider(state: IOptions): number {
    return this.slider.getPosition(state);
  }

  public getPositionHandle(state: IOptions, id: number): number {
    return this.handles[id].getPositionHandle(state);
  }

  private addSlider(): Slider {
    return new Slider(this.root);
  }

  private addFill(): Fill {
    return new Fill(this.slider.getElement());
  }

  private addHandles(): any {
    this.handles.push(new Handle(this.slider.getElement(), 0));
    this.handles.push(new Handle(this.slider.getElement(), 1));
  }

  private addScale(): any {
    return new Scale(this.slider.getElement());
  }

  private addOnHandles(): void {
    this.handles[0].on("drag_0", this.emitDrag.bind(this));
    this.handles[1].on("drag_1", this.emitDrag.bind(this));
  }

  private addOnSlider(): void {
    this.slider.on("clickSlider", this.emitClick.bind(this));
  }

  private addOnScale(): void {
    this.scale.on("clickScaleVal", this.emitScaleVal.bind(this));
    this.scale.on("clickScaleValEnd", this.emitScaleValEnd.bind(this));
  }

  private emitDrag(left: object): void {
    this.emit("dragHandle", left);
  }

  private emitClick(left: object): void {
    this.emit("clickSlider", left);
  }

  private emitScaleVal(val: object): void {
    this.emit('clickScaleVal', val);
  }

  private emitScaleValEnd(valEnd: object): void {
    this.emit('clickScaleValEnd', valEnd);
  }

}

export default View;
