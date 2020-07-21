import Model from "../Model/Model";
import View from "../View/View";
import IOptions from "../defaultOptions";
import EventEmitter from "../EventEmitter";

class Presenter extends EventEmitter {
  private model: Model;
  private view: View;

  constructor(model: Model, view: View) {
    super();

    this.model = model;
    this.view = view;

    this.render(this.model.getState());

    this.view.on("dragHandle", this.update.bind(this));
    this.view.on("clickSlider", this.update.bind(this));
    this.view.on("clickScaleVal", this.model.setState.bind(this));
    this.view.on("clickScaleValEnd", this.model.setState.bind(this));
    this.view.on("clickScaleValItem", this.update.bind(this));
    this.model.on("updateState", this.render.bind(this));
    this.on("updateSlider", this.model.setState.bind(this));

    this.subscribeToInitModel = this.subscribeToInitModel.bind(this);
    this.subscribeToUpdates = this.subscribeToUpdates.bind(this);
    this.setState = this.setState.bind(this);
  }

  public subscribeToInitModel(callback: Function) {
    this.model.on("initState", callback(this.model.getState()));
  }

  public subscribeToUpdates(callback: Function) {
    this.model.on("updateState", () => callback(this.model.getState()));
  }

  public setState(options: Partial<IOptions>): void {
    this.model.setState(options);
  }

  public getState(): {} {
    return this.model.getState();
  }

  private render(state: IOptions): void {
    this.view.renderSlider(state);
    this.view.renderHandle(state);
    this.view.renderFill(state);
    this.view.renderTooltip(state);
    this.view.renderScale(state);
  }

  private update({ leftX, leftY, id }: { leftX: number; leftY: number; id: number }): void {
    let idHandle: number = id;

    if (id == undefined) {
      idHandle = this.model.findNearHandle(
        leftX,
        leftY,
        this.view.getPositionSlider(this.model.getState()),
        this.view.getPositionHandle(this.model.getState(), 0),
        this.view.getPositionHandle(this.model.getState(), 1)
      );
    }

    if (this.model.getState()["vertical"]) {
      this.model.setVal(
        leftY,
        this.view.getLengthSlider(this.model.getState()),
        idHandle
      );
    } else {
      this.model.setVal(
        leftX,
        this.view.getLengthSlider(this.model.getState()),
        idHandle
      );
    }

    this.emit("updateSlider", this.model.getState());
  }
}

export default Presenter;
