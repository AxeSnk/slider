import Model, { IModel } from './model';
import View, { IView } from './view';

export default class Presenter {

  private model: IModel;
  private view: IView;

  constructor(model: IModel, view: IView) {

    this.model = model;
    this.view = view;
    
    this.view.renderHandle(this.model.getVal(),this.model.getRange());
  }

  
}