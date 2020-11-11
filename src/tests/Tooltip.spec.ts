import Tooltip from '../MVP/View/Tooltip/Tooltip';

describe('Tooltip tests:', () => {
  let tooltips: Tooltip;

  beforeEach(() => {
    tooltips = new Tooltip(document.body);
  });

  test('create tooltip element', () => {
    expect(tooltips.getTooltip()).toBeInstanceOf(HTMLElement);
  });

  describe('renderTooltip', () => {
    const val = 2;
    const minVal = -3;
    const maxVal = 5;

    test('renderTooltip horizontal mask = true', () => {
      const tooltip = true;
      const vertical = false;

      tooltips.renderTooltip(
        {
          tooltip,
          val,
          minVal,
          maxVal,
          vertical,
        },
      );
      const element: HTMLElement = tooltips.getTooltip();
      expect(element.innerHTML).toBe('2');
      expect(element.className).toBe('slider__tooltip');
      expect(element.style.display).toBe('block');
      expect(element.style.left).toBe('');
      expect(element.style.top).toBe(`${-1.6}rem`);
    });

    test('renderTooltip vertical mask = false', () => {
      const tooltip = false;
      const vertical = true;

      tooltips.renderTooltip(
        {
          tooltip,
          val,
          minVal,
          maxVal,
          vertical,
        },
      );
      const element: HTMLElement = tooltips.getTooltip();
      expect(element.innerHTML).toBe('2');
      expect(element.className).toBe('slider__tooltip tooltip--vertical');
      expect(element.style.display).toBe('none');
      expect(element.style.left).toBe(`${-1.6}rem`);
      expect(element.style.top).toBe('');
    });
  });
});