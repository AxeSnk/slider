import Model from '../../../MVP/Model/Model';
import defaultOptions from '../../../MVP/utils/defaultOptions';

describe('Model tests:', () => {
  let model: Model;
  const options = defaultOptions;

  beforeEach(() => {
    model = new Model(options);
  });

  afterEach(() => {
    model.setState(defaultOptions);
  });

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

  test('should set state', () => {
    model.setState(newOptions);

    expect(model.getState()).toEqual(newOptions);
  });

  test('should set val', () => {
    model.setVal({ left: 100, sliderLength: 400, idHandle: 0 });
    expect(model.getState().val).toEqual(3);
  });

  test('should find the nearest handle', () => {
    const id = model.findNearHandle({
      left: 100, sliderPos: 50, handleFirstPos: 75, handleSecondPos: 90,
    });
    expect(id).toEqual(1);
  });
});
