import createElement from '../../utils/createElement';
import EventEmitter from '../../utils/EventEmitter';

import { IOptions } from '../../utils/IOptions';

class Slider extends EventEmitter {
  private slider: HTMLElement;

  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    super();

    this.parent = parent;
    this.slider = createElement('div', { class: 'slider' });
    this.init();
    this.addListener();
  }

  public render(state: IOptions): void {
    state.vertical
      ? this.slider.classList.add('slider--vertical')
      : this.slider.classList.remove('slider--vertical');
  }

  public getPosition(state: IOptions): number {
    return state.vertical
      ? this.slider.getBoundingClientRect().top
      : this.slider.getBoundingClientRect().left;
  }

  public getLength(state: IOptions): number {
    return state.vertical ? this.slider.offsetHeight : this.slider.offsetWidth;
  }

  public getElement(): HTMLElement {
    return this.slider;
  }

  private init(): void {
    this.parent.appendChild(this.slider);
  }

  private addListener(): void {
    this.slider.addEventListener('click', this.clickSlider.bind(this));
  }

  private clickSlider(event: MouseEvent): void {
    const slider = event.currentTarget as HTMLElement;
    const sliderX = slider.getBoundingClientRect().left;
    const sliderY = slider.getBoundingClientRect().top;
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const leftX = mouseX - sliderX;
    const leftY = mouseY - sliderY;

    this.emit('clickSlider', { leftX, leftY });
  }
}

export default Slider;
