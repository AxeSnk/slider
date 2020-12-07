import Scale from '../../../MVP/View/Scale/Scale';
import defaultOptions from '../../../MVP/utils/defaultOptions';

describe('Scale tests:', () => {
  let scale: Scale;
  let parent: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = '';
    parent = document.createElement('div');
    document.body.appendChild(parent);
    scale = new Scale(parent);
  });

  afterEach(() => {
    scale.render(defaultOptions);
  });

  test('should set style display block for element', () => {
    scale.render({ ...defaultOptions, vertical: true });
    const element: HTMLElement = parent.firstElementChild as HTMLElement;
    const scaleUnits = parent.querySelectorAll('.slider__scale-value-item');
    expect(element.style.display).toEqual('block');
    expect(scaleUnits.length).toEqual(4);
  });

  test('should set style display none for element', () => {
    scale.render({ ...defaultOptions, scale: false });
    const element: HTMLElement = parent.firstElementChild as HTMLElement;
    expect(element.style.display).toEqual('none');
  });
});
