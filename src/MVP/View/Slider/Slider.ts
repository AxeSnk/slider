import createElement from '../../utils/createElement';
import EventEmitter from '../../utils/EventEmitter';

import { IOptions } from '../../utils/IOptions';

class Slider extends EventEmitter {
  private slider: HTMLElement;

  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    super();

    this.parent = parent;
    this.slider = createElement('div', { class: 'slider__wrapper' });
    this.init();
    this.addListener();
  }

  public render(state: IOptions): void {
    if (state.vertical) {
      this.slider.classList.add('slider_vertical');
    } else {
      this.slider.classList.remove('slider_vertical');
    }
  }

  public getPosition(state: IOptions): number {
    if (state.vertical) {
      return this.slider.getBoundingClientRect().top;
    }
    return this.slider.getBoundingClientRect().left;
  }

  public getLength(state: IOptions): number {
    if (state.vertical) {
      return this.slider.offsetHeight;
    }
    return this.slider.offsetWidth;
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
