import View, { IView } from "./view/view";
import Model, { IModel } from "./model/model";
import { defaultOptions } from "./defaultOptions";
import Presenter from "./presenter/presenter";

export default class SliderFacade {
	private model: IModel;
	private view: IView;
	private presenter: Presenter;

	constructor(parent, options) {
		this.model = new Model(options);
		this.view = new View(this);
		this.presenter = new Presenter(this.model, this.view);
	}

	public setValue(value: number) {
		this.model.setValue(value)
	}
}