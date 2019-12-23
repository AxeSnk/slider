import { IModel } from './model';
import { IView } from './view';

export default class Presenter {

  private model: IModel;
  private view: IView;

  constructor( model: IModel, view: IView ) {

    this.model = model;
    this.view = view;
    
    view.renderHandle( this.model.getVal(), this.model.getMinVal(), this.model.getRange() );
    view.on('drag', this.upDate.bind(this))

    if ( this.model.getTooltipMask() ) {

      this.view.renderTooltip();
      this.view.setValueTooltip( this.model.getVal() );

    }
    
    if ( this.model.getScaleMask() ) {

      this.view.createDivisionScale( this.model.getArrayOfDivisions() );
      this.view.arrangeValuesOnTheScale( this.model.getArrayOfDivisions() );

    };

  }

  upDate({ leftX, width }) {
    this.model.setVal(leftX, width);
    this.view.renderHandle(this.model.getVal(), this.model.getMinVal(), this.model.getRange());
  }
  
}