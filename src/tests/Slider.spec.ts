import Slider from '../MVP/View/Slider/Slider';
import IOptions, { defaultOptions } from '../MVP/defaultOptions';

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

    expect(element.className).toBe('slider');
  });

  test('renderSlider vertical', () => {
    state = { ...defaultOptions, ...{ vertical: true } };
    slider.render(state);
    const element: HTMLElement = slider.getElement();

    expect(element.className).toBe('slider slider--vertical');
  });
});
