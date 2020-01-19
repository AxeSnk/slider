import { IModel } from '../model/model';
import { IView } from '../view/view';

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

    this.view.on('dragHandle', this.update.bind(this));
  }

  private render(): void {
    if(this.model.getVerticalMask()) {
      this.view.makeVerticalSlider();
      this.view.renderHandle(this.view.getWidth(), this.model.getVal(), this.model.getValEnd(), this.model.getMinVal(), this.model.getDifference(), this.model.getVerticalMask(), this.view.getHeight());
      this.view.makeVerticalFill();
      this.view.makeVerticalScale();
    } else {
      this.view.renderHandle(this.view.getWidth(), this.model.getVal(), this.model.getValEnd(), this.model.getMinVal(), this.model.getDifference(), this.model.getVerticalMask(), this.view.getWidth());
      this.view.renderFill();
    }

    if(this.model.getTooltipMask()) {
      this.view.renderTooltip(this.model.getVal(), this.model.getValEnd(), this.model.getMinVal(), this.model.getMaxVal(), this.view.getHandleHeight(), this.model.getVerticalMask());
    }
    
    if(this.model.getScaleMask()) {
      this.view.renderScale(this.model.getArrayDivisions(), this.view.getWidth(), this.view.getHandleWidth());
    };
  }

  private update({ leftX, leftY, id }: { leftX: number, leftY: number, id: number }): void {
    if (this.model.getVerticalMask()) {
      if (id === 0) {
        this.model.setVal(leftY, this.view.getHeight());
      } else {
        this.model.setValEnd(leftY, this.view.getHeight());
      }
      this.view.makeVerticalFill();
    } else {
      if (id === 0) {
        this.model.setVal(leftX, this.view.getWidth());
      } else {
        this.model.setValEnd(leftX, this.view.getWidth());
      }
      this.view.renderFill();
    }
    this.view.updateHandles(this.model.getVal(), this.model.getValEnd(), this.model.getMinVal(), this.model.getDifference(), this.view.getWidth(), this.model.getStep(), this.model.getVerticalMask(), this.view.getHeight(), id);

    if(this.model.getTooltipMask()) {
      if(this.model.getVerticalMask()) {
        this.view.updateTooltip(this.model.getMinVal(), this.model.getMaxVal(), this.view.getHandleHeight(), this.view.getPositionHandle(0), this.view.getHeight(), this.model.getVerticalMask());
        if (this.model.getRangeMask()) {
          this.view.updateTooltip(this.model.getMinVal(), this.model.getMaxVal(), this.view.getHandleHeight(), this.view.getPositionHandle(1), this.view.getHeight(), this.model.getVerticalMask());
        }
      } else {
        this.view.updateTooltip(this.model.getMinVal(), this.model.getMaxVal(), this.view.getHandleWidth(), this.view.getPositionHandle(0), this.view.getWidth(), this.model.getVerticalMask());
        if (this.model.getRangeMask()) {
          this.view.updateTooltip(this.model.getMinVal(), this.model.getMaxVal(), this.view.getHandleHeight(), this.view.getPositionHandle(1), this.view.getHeight(), this.model.getVerticalMask());
        }
      }
    }
  }
  
}