import { IModel } from './model';
import { IView } from './view';

export default class Presenter {

  private model: IModel;
  private view: IView;

  constructor(model: IModel, view: IView) {

    this.model = model;
    this.view = view;
    
    this.render();

    this.view.on('drag', this.update.bind(this));
  }

  render() {
    this.view.renderHandle(this.model.getVal(), this.model.getMinVal(), this.model.getDifference());
    this.view.renderFill();
    
    if (this.model.getTooltipMask()) {
      this.view.renderTooltip(this.model.getVal());
    }
    
    if (this.model.getScaleMask()) {
      this.view.renderScale(this.model.getArrayDivisions());
    };
  }

  update({ leftX, width }) {
    this.model.setVal(leftX, width);
    this.view.renderHandle(this.model.getVal(), this.model.getMinVal(), this.model.getDifference());
  }
  
}