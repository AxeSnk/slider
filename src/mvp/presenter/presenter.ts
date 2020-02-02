import { IModel } from "../model/model";
import { IView } from "../view/view";

export default class Presenter {
  private model: IModel;
  private view: IView;

  constructor(model: IModel, view: IView) {
    this.model = model;
    this.view = view;
    if (this.model.getRangeMask()) {
      this.view.setRange();
    }

    this.view.addHandles();
    this.view.addOnHandles();
    this.render();

    this.view.on("dragHandle", this.update.bind(this));
  }
  public getValue(): number {
    return this.model.getVal()
  }
  public setValue(value: number): void {
    this.model.setValue(value);
  }

  private render(): void {
    if (this.model.getVerticalMask()) {
      this.view.makeVerticalSlider();
      this.view.renderHandle(
        this.view.getWidth(),
        this.model.getVal(),
        this.model.getValEnd(),
        this.model.getMinVal(),
        this.model.getDifference(),
        this.model.getVerticalMask(),
        this.view.getHeight()
      );
      this.view.makeVerticalFill();
      if (this.model.getScaleMask()) {
        this.view.renderScale(this.model.getArrayDivisions());
        this.view.makeVerticalScale();
      }
    } else {
      this.view.renderHandle(
        this.view.getWidth(),
        this.model.getVal(),
        this.model.getValEnd(),
        this.model.getMinVal(),
        this.model.getDifference(),
        this.model.getVerticalMask(),
        this.view.getWidth()
      );
      this.view.renderFill();
      if (this.model.getScaleMask()) {
        this.view.renderScale(this.model.getArrayDivisions());
        this.view.makeHorizontalScale();
      }
    }

    if (this.model.getTooltipMask()) {
      this.view.renderTooltip(
        this.model.getVal(),
        this.model.getValEnd(),
        this.model.getMinVal(),
        this.model.getMaxVal(),
        this.view.getHandleHeight(),
        this.model.getVerticalMask()
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
        this.model.getVerticalMask(),
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
        this.model.getVerticalMask(),
        this.view.getHeight(),
        this.view.getWidth(),
        null,
        id
      );
    }
    if (this.model.getVerticalMask()) {
      this.model.setVal(leftY, this.view.getHeight(), id);
      this.view.makeVerticalFill();
      if (this.model.getTooltipMask()) {
        if (this.model.getRangeMask()) {
          this.view.updateTooltip(
            this.model.getMinVal(),
            this.model.getMaxVal(),
            this.view.getHandleHeight(),
            this.view.getPositionHandle(id),
            this.view.getHeight(),
            this.model.getVerticalMask(),
            id,
            this.view.getPositionHandle(Math.abs(id - 1))
          );
        } else {
          this.view.updateTooltip(
            this.model.getMinVal(),
            this.model.getMaxVal(),
            this.view.getHandleHeight(),
            this.view.getPositionHandle(id),
            this.view.getHeight(),
            this.model.getVerticalMask(),
            id,
            null
          );
        }
      }
    } else {
      this.model.setVal(leftX, this.view.getWidth(), id);
      this.view.renderFill();
      if (this.model.getTooltipMask()) {
        if (this.model.getRangeMask()) {
          this.view.updateTooltip(
            this.model.getMinVal(),
            this.model.getMaxVal(),
            this.view.getHandleHeight(),
            this.view.getPositionHandle(id),
            this.view.getWidth(),
            this.model.getVerticalMask(),
            id,
            this.view.getPositionHandle(Math.abs(id - 1))
          );
        } else {
          this.view.updateTooltip(
            this.model.getMinVal(),
            this.model.getMaxVal(),
            this.view.getHandleHeight(),
            this.view.getPositionHandle(id),
            this.view.getWidth(),
            this.model.getVerticalMask(),
            id,
            null
          );
        }
      }
    }
  }
}
