import { IModel } from '../model/model';
import { IView } from '../view/view';

export default class Presenter {

  private model: IModel;
  private view: IView;

  constructor(model: IModel, view: IView) {

    this.model = model;
    this.view = view;
    
    this.render();

    this.view.on('dragHandle', this.update.bind(this));
  }

  private render(): void {
    this.view.renderHandles(this.model.getVal(), this.model.getMinVal(), this.model.getDifference(), this.view.getWidth());
    this.view.renderFill();
    
    if(this.model.getTooltipMask()) {
      this.view.renderTooltip(this.model.getVal(), this.model.getMinVal(), this.model.getMaxVal(), this.view.getHandleHeight());
    }
    
    if(this.model.getScaleMask()) {
      this.view.renderScale(this.model.getArrayDivisions(), this.view.getWidth(), this.view.getHandleWidth());
    };
  }

  private update({ leftX }: { leftX: number }): void {
    this.model.setVal(leftX, this.view.getWidth());
    this.view.renderHandles(this.model.getVal(), this.model.getMinVal(), this.model.getDifference(), this.view.getWidth());
    this.view.renderFill();

    if(this.model.getTooltipMask()) {
      this.view.renderTooltip(this.model.getVal(), this.model.getMinVal(), this.model.getMaxVal(), this.view.getHandleHeight());
    }
  }
  
}