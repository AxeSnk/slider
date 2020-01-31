import View, { IView } from "./view/view";
import Presenter from "./presenter/presenter";
import Model, { IModel } from "./model/model";
import IOptions from './defaultOptions';

class SliderFacade{
  model: IModel;
  view: IView;
  presenter: Presenter;

  constructor(root: HTMLElement, options: IOptions){
    this.model = new Model(options);
    this.view = new View(root);
    this.presenter = new Presenter(this.model, this.view);
  }
  
  public setValue(value: number): void {
    this.presenter.setValue(value)
  }
}

export default SliderFacade;