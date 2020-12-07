import Tooltip from '../../../MVP/View/Tooltip/Tooltip';

describe('Tooltip tests:', () => {
  let tooltips: Tooltip;

  beforeEach(() => {
    tooltips = new Tooltip(document.body);
  });

  test('create tooltip element', () => {
    expect(tooltips.getTooltip()).toBeInstanceOf(HTMLElement);
  });

  describe('renderTooltip', () => {
    let val = 2;
    const minVal = -3;
    const maxVal = 5;

    test('renderTooltip horizontal mask = true', () => {
      const tooltip = true;

      tooltips.renderTooltip(
        {
          tooltip,
          val,
          minVal,
          maxVal,
        },
      );
      const element: HTMLElement = tooltips.getTooltip();
      expect(element.innerHTML).toBe('2');
      expect(element.style.display).toBe('block');
    });

    test('renderTooltip vertical mask = false', () => {
      const tooltip = false;

      tooltips.renderTooltip(
        {
          tooltip,
          val,
          minVal,
          maxVal,
        },
      );
      const element: HTMLElement = tooltips.getTooltip();
      expect(element.innerHTML).toBe('2');
      expect(element.style.display).toBe('none');
    });

    test('should set tooltip to minVal', () => {
      const tooltip = true;
      val = -5;

      tooltips.renderTooltip(
        {
          tooltip,
          val,
          minVal,
          maxVal,
        },
      );

      const element: HTMLElement = tooltips.getTooltip();
      expect(element.innerHTML).toBe('-3');
    });

    test('should set tooltip to maxVal', () => {
      const tooltip = true;
      val = 7;

      tooltips.renderTooltip(
        {
          tooltip,
          val,
          minVal,
          maxVal,
        },
      );

      const element: HTMLElement = tooltips.getTooltip();
      expect(element.innerHTML).toBe('5');
    });
  });
});
