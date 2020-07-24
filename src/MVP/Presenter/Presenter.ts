import Model from "../Model/Model";
import View from "../View/View";
import IOptions from "../defaultOptions";
import EventEmitter from "../EventEmitter";

interface IUpdate {
  leftX: number;
  leftY: number;
  id: number;
}

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

  private update(arg: IUpdate): void {
    const { leftX, leftY, id } = arg;
    let idHandle = id;
    const isVertical = this.model.getState()["vertical"];
    const left = isVertical ? leftY : leftX;
    const sliderPos = this.view.getPositionSlider(this.model.getState());
    const handleFirstPos = this.view.getPositionHandle(
      this.model.getState(),
      0
    );
    const handleSecondPos = this.view.getPositionHandle(
      this.model.getState(),
      1
    );
    const sliderLength = this.view.getLengthSlider(this.model.getState());

    if (id == undefined) {
      idHandle = this.model.findNearHandle({
        left,
        sliderPos,
        handleFirstPos,
        handleSecondPos,
      });
    }

    this.model.setVal({ left, sliderLength, idHandle });

    this.emit("updateSlider", this.model.getState());
  }
}

export default Presenter;
