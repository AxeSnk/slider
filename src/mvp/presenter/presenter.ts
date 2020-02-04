import Model from "../model/model";
import View from "../view/view";

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
  }
  public getState(): {} {
    return this.model.getState();
  }

  public getValue(): number {
    return this.model.getVal();
  }
  public setValue(value: number): void {
    this.model.setValue(value);
  }

  private render(): void {
    if (this.model.getVerticalMask()) {
      this.view.makeVerticalSlider();
      this.view.renderHandle(
        this.model.getState(),
        this.view.getWidth(),
        this.view.getHeight()
      );
      this.view.makeVerticalFill(this.model.getState());
      if (this.model.getScaleMask()) {
        this.view.renderScale(this.model.getArrayDivisions());
        this.view.makeVerticalScale();
      }
    } else {
      this.view.renderHandle(
        this.model.getState(),
        this.view.getWidth(),
        this.view.getHeight()
      );
      this.view.renderFill(this.model.getState());
      if (this.model.getScaleMask()) {
        this.view.renderScale(this.model.getArrayDivisions());
        this.view.makeHorizontalScale();
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
        this.view.getHeight(),
        this.view.getWidth(),
        this.model.getDifference(),
        this.model.getStep()
      );
      this.view.setPositionHandle(
        1,
        this.model.getVerticalMask(),
        this.model.getValEnd(),
        this.model.getMinVal(),
        this.view.getHeight(),
        this.view.getWidth(),
        this.model.getDifference(),
        this.model.getStep()
      );
      this.view.updateHandles(
        this.model.getState(),
        this.view.getHeight(),
        this.view.getWidth(),
        this.view.getPositionHandle(Math.abs(id - 1)),
        id
      );
    } else {
      this.view.setPositionHandle(
        0,
        this.model.getVerticalMask(),
        this.model.getVal(),
        this.model.getMinVal(),
        this.view.getHeight(),
        this.view.getWidth(),
        this.model.getDifference(),
        this.model.getStep()
      );
      this.view.updateHandles(
        this.model.getState(),
        this.view.getHeight(),
        this.view.getWidth(),
        null,
        id
      );
    }
    if (this.model.getVerticalMask()) {
      this.model.setVal(leftY, this.view.getHeight(), id);
      this.view.makeVerticalFill(this.model.getState());
      if (this.model.getTooltipMask()) {
        if (this.model.getRangeMask()) {
          this.view.updateTooltip(
            this.model.getState(),
            this.view.getHandleHeight(),
            this.view.getPositionHandle(id),
            this.view.getHeight(),
            id,
            this.view.getPositionHandle(Math.abs(id - 1))
          );
        } else {
          this.view.updateTooltip(
            this.model.getState(),
            this.view.getHandleHeight(),
            this.view.getPositionHandle(id),
            this.view.getHeight(),
            id,
            null
          );
        }
      }
    } else {
      this.model.setVal(leftX, this.view.getWidth(), id);
      this.view.renderFill(this.model.getState());
      if (this.model.getTooltipMask()) {
        if (this.model.getRangeMask()) {
          this.view.updateTooltip(
            this.model.getState(),
            this.view.getHandleHeight(),
            this.view.getPositionHandle(id),
            this.view.getWidth(),
            id,
            this.view.getPositionHandle(Math.abs(id - 1))
          );
        } else {
          this.view.updateTooltip(
            this.model.getState(),
            this.view.getHandleHeight(),
            this.view.getPositionHandle(id),
            this.view.getWidth(),
            id,
            null
          );
        }
      }
    }
  }
}
