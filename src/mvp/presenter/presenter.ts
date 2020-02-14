import Model from "../model/model";
import View from "../view/view";
import IOptions from "../defaultOptions";

export default class Presenter {
  private model: Model;
  private view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    this.view.addHandles(this.model.getState());
    this.view.addOnHandles(this.model.getState());
    this.render();

    this.view.on("dragHandle", this.update.bind(this));
    this.model.on("updateState", this.updateRender.bind(this));
    this.subscribeToUpdates = this.subscribeToUpdates.bind(this);
    this.setState = this.setState.bind(this);
  }

  subscribeToUpdates(callback: Function) {
    this.model.on("updateState", () => callback(this.model.getState()));
  }

  updateRender(state: IOptions): void {
    this.view.renderHandle(state, this.view.getLenhgtSlider(state));
    this.view.renderFill(state);
    this.view.renderTooltip(state, this.view.getHandleHeight());
    this.view.clearScale();
    this.view.renderScale(state);
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
      this.view.setOrientationSlider(this.model.getState());
      this.view.renderHandle(
        this.model.getState(),
        this.view.getLenhgtSlider(this.model.getState())
      );
      this.view.makeVerticalFill(this.model.getState());
      if (this.model.getScaleMask()) {
        this.view.renderScale(this.model.getState());
        this.view.setOrientationScale(this.model.getState());
      }
    } else {
      this.view.setOrientationSlider(this.model.getState());
      this.view.renderHandle(
        this.model.getState(),
        this.view.getLenhgtSlider(this.model.getState())
      );
      this.view.renderFill(this.model.getState());
      if (this.model.getScaleMask()) {
        this.view.renderScale(this.model.getState());
        this.view.setOrientationScale(this.model.getState());
      }
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
      this.view.makeVerticalFill(this.model.getState());
      if (this.model.getTooltipMask()) {
        if (this.model.getRangeMask()) {
          this.view.updateTooltip(
            this.model.getState(),
            this.view.getHandleHeight(),
            this.view.getPositionHandle(id),
            this.view.getLenhgtSlider(this.model.getState()),
            id,
            this.view.getPositionHandle(Math.abs(id - 1))
          );
        } else {
          this.view.updateTooltip(
            this.model.getState(),
            this.view.getHandleHeight(),
            this.view.getPositionHandle(id),
            this.view.getLenhgtSlider(this.model.getState()),
            id,
            null
          );
        }
      }
    } else {
      this.model.setVal(
        leftX,
        this.view.getLenhgtSlider(this.model.getState()),
        id
      );
      this.view.renderFill(this.model.getState());
      if (this.model.getTooltipMask()) {
        if (this.model.getRangeMask()) {
          this.view.updateTooltip(
            this.model.getState(),
            this.view.getHandleHeight(),
            this.view.getPositionHandle(id),
            this.view.getLenhgtSlider(this.model.getState()),
            id,
            this.view.getPositionHandle(Math.abs(id - 1))
          );
        } else {
          this.view.updateTooltip(
            this.model.getState(),
            this.view.getHandleHeight(),
            this.view.getPositionHandle(id),
            this.view.getLenhgtSlider(this.model.getState()),
            id,
            null
          );
        }
      }
    }
  }
}
