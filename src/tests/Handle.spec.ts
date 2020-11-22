import Handle from '../MVP/View/Handle/Handle';

describe('Handle tests:', () => {
  let handle: Handle;

  beforeEach(() => {
    handle = new Handle(document.body, 0);
  });

  test('create handle element', () => {
    expect(handle.getHandle()).toBeInstanceOf(HTMLElement);
  });

  describe('renderHandle:', () => {
    const val = 2;
    const minVal = -3;
    const maxVal = 7;

    test('renderHandle horizontal', () => {
      const vertical = false;
      handle.renderHandle(val, minVal, maxVal, vertical);
      const element: HTMLElement = handle.getHandle();

      expect(element.style.top).toBe('');
      expect(element.style.left).toBe('50%');
    });

    test('renderHandle vertical', () => {
      const vertical = true;
      handle.renderHandle(val, minVal, maxVal, vertical);
      const element: HTMLElement = handle.getHandle();

      expect(element.style.left).toBe('');
      expect(element.style.top).toBe('50%');
    });
  });
});
