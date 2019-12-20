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
    this.view.dragHandle( this.model.getStep(), this.model.getMaxVal(), this.model.getMinVal(), this.model.getTooltipMask() );


    if ( this.model.getTooltipMask() ) {

      this.view.renderTooltip();
      this.view.setValueTooltip( this.model.getVal() );

    }
    
    if ( this.model.getScaleMask() ) {

      this.view.createDivisionScale( this.model.getArrayOfDivisions() );
      this.view.arrangeValuesOnTheScale( this.model.getArrayOfDivisions() );

    };

  }
  
}