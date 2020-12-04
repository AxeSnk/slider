import Slider from '../MVP/View/Slider/Slider';
import { IOptions } from '../MVP/utils/IOptions';
import defaultOptions from '../MVP/utils/defaultOptions';

describe('Slider tests:', () => {
  let state: IOptions;
  const slider: Slider = new Slider(document.body);

  test('create slider element', () => {
    expect(slider.getElement()).toBeInstanceOf(HTMLElement);
  });

  test('renderSlider horizontal', () => {
    state = { ...defaultOptions, ...{ vertical: false } };
    slider.render(state);
    const element: HTMLElement = slider.getElement();

    expect(element.className).toBe('slider__wrapper');
  });

  test('renderSlider vertical', () => {
    state = { ...defaultOptions, ...{ vertical: true } };
    slider.render(state);
    const element: HTMLElement = slider.getElement();

    expect(element.className).toBe('slider__wrapper slider_vertical');
  });
});
