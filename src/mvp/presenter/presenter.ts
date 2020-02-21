import Model from "../Model/model";
import View from "../View/View";
import IOptions from "../defaultOptions";
import EventEmitter from "../eventEmitter";

class Presenter extends EventEmitter {
  private model: Model;
  private view: View;

  constructor(model: Model, view: View) {
    super();

    this.model = model;
    this.view = view;

    this.view.addHandles(this.model.getState());
    this.view.addOnHandles(this.model.getState());
    this.render();

    this.view.on("dragHandle", this.update.bind(this));
    this.model.on("updateState", this.updateRender.bind(this));
    this.on("updateSlider", this.model.setState.bind(this));

    this.subscribeToUpdates = this.subscribeToUpdates.bind(this);
    this.setState = this.setState.bind(this);
  }

  subscribeToUpdates(callback: Function) {
    this.model.on("updateState", () => callback(this.model.getState()));
  }

  updateRender(state: IOptions): void {
    this.view.renderSlider(state);
    // this.view.renderHandle(state, this.view.getLenhgtSlider(state));
    this.view.renderFill(state);
    this.view.renderTooltip(state, this.view.getHandleHeight());
  }

  public setState(options: Partial<IOptions>): void {
    this.model.setState(options);
  }
  public getState(): {} {
    return this.model.getState();
  }

  public getValue(): number {
    return this.model.getVal();
  }

  private render(): void {
    if (this.model.getState()["vertical"]) {
      this.view.renderSlider(this.model.getState());
      this.view.renderHandle(
        this.model.getState(),
        this.view.getLenhgtSlider(this.model.getState())
      );
      this.view.renderFill(this.model.getState());
    } else {
      this.view.renderSlider(this.model.getState());
      this.view.renderHandle(
        this.model.getState(),
        this.view.getLenhgtSlider(this.model.getState())
      );
      this.view.renderFill(this.model.getState());
    }

    if (this.model.getTooltipMask()) {
      this.view.renderTooltip(
        this.model.getState(),
        this.view.getHandleHeight()
      );
    }
  }

  private update({
    leftX,
    leftY,
    id
  }: {
    leftX: number;
    leftY: number;
    id: number;
  }): void {
    if (this.model.getRangeMask()) {
      this.view.setPositionHandle(
        0,
        this.model.getVerticalMask(),
        this.model.getVal(),
        this.model.getMinVal(),
        this.view.getLenhgtSlider(this.model.getState()),
        this.model.getDifference(),
        this.model.getStep()
      );
      this.view.setPositionHandle(
        1,
        this.model.getVerticalMask(),
        this.model.getValEnd(),
        this.model.getMinVal(),
        this.view.getLenhgtSlider(this.model.getState()),
        this.model.getDifference(),
        this.model.getStep()
      );
      this.view.updateHandles(
        this.model.getState(),
        this.view.getLenhgtSlider(this.model.getState()),
        this.view.getPositionHandle(Math.abs(id - 1)),
        id
      );
    } else {
      this.view.setPositionHandle(
        0,
        this.model.getVerticalMask(),
        this.model.getVal(),
        this.model.getMinVal(),
        this.view.getLenhgtSlider(this.model.getState()),
        this.model.getDifference(),
        this.model.getStep()
      );
      this.view.updateHandles(
        this.model.getState(),
        this.view.getLenhgtSlider(this.model.getState()),
        null,
        id
      );
    }
    if (this.model.getVerticalMask()) {
      this.model.setVal(
        leftY,
        this.view.getLenhgtSlider(this.model.getState()),
        id
      );
    } else {
      this.model.setVal(
        leftX,
        this.view.getLenhgtSlider(this.model.getState()),
        id
      );
    }
    this.emit("updateSlider", this.model.getState());
  }
}

export default Presenter;
