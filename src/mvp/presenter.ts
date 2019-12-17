import Model, { IModel } from './model';
import View, { IView } from './view';
import { IPublisher } from './observer';

export default class Presenter {

  private model: IModel;
  private view: IView;
  private publisher: IPublisher;

  constructor(model: IModel, view: IView, publisher: IPublisher) {

    this.model = model;
    this.view = view;
    this.publisher = this.publisher
    
    this.view.renderHandle(this.model.getVal(), this.model.getMinVal(), this.model.getRange());
  }

  
}