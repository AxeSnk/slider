import { IModel } from './model';
import { IView } from './view';
import { IObservable } from './observable';

export default class Presenter {

  private model: IModel;
  private view: IView;
  private observable: IObservable;

  constructor( model: IModel, view: IView ) {

    this.model = model;
    this.view = view;
    
    this.view.renderHandle( this.model.getVal(), this.model.getMinVal(), this.model.getRange() );
  }

  
}