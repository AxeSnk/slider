import Handle from '../../../MVP/View/Handle/Handle';
import defaultOptions from '../../../MVP/utils/defaultOptions';

describe('Handle tests:', () => {
  let handle: Handle;
  let parent: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = '';
    parent = document.createElement('div');
    document.body.appendChild(parent);
    handle = new Handle(parent, 0);
  });

  test('create handle element', () => {
    expect(handle.getHandle()).toBeInstanceOf(HTMLElement);
  });

  test('should return position handle', () => {
    expect(handle.getPositionHandle(defaultOptions)).toEqual(0);
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
      expect(element.style.left).toBe('');
    });

    test('renderHandle vertical', () => {
      const vertical = true;
      handle.renderHandle(val, minVal, maxVal, vertical);
      const element: HTMLElement = handle.getHandle();

      expect(element.style.left).toBe('');
      expect(element.style.top).toBe('');
    });
  });
});
