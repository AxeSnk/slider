import View from '../../../MVP/View/View';
import Model from '../../../MVP/Model/Model';
import Presenter from '../../../MVP/Presenter/Presenter';
import defaultOptions from '../../../MVP/utils/defaultOptions';

describe('Presenter tests:', () => {
  let presenter: Presenter;
  let model: Model;
  let view: View;
  const options = defaultOptions;
  let initModel: jest.Mock;
  let updateModel: jest.Mock;

  beforeEach(() => {
    model = new Model(options);
    view = new View(document.body);
    presenter = new Presenter(model, view);

    initModel = jest.fn();
    updateModel = jest.fn();
    presenter.subscribeToInitModel(initModel);
    presenter.subscribeToUpdates(updateModel);
  });

  afterEach(() => {
    presenter.setState(options);
  });

  test('should set state', () => {
    const newOptions = {
      val: 5,
      valEnd: 7,
      minVal: 1,
      maxVal: 11,
      step: 1,
      range: true,
      tooltip: false,
      vertical: true,
      scale: false,
    };

    presenter.setState(newOptions);
    expect(presenter.getState()).toEqual(newOptions);
  });

  test('should return state', () => {
    expect(presenter.getState()).toEqual(options);
  });

  test('should subscribe to init model', () => {
    expect(initModel).toHaveBeenCalled();
    expect(initModel).toHaveBeenCalledTimes(1);
    expect(initModel).toHaveBeenCalledWith(options);
  });

  test('should subscribe to update state model', () => {
    model.setState({ val: 5 });
    expect(updateModel).toHaveBeenCalled();
    expect(updateModel).toHaveBeenCalledTimes(1);
    expect(updateModel).toHaveBeenCalledWith({ ...options, val: 5 });
  });
});
