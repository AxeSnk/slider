import createElement from '../../utils/createElement';

import { IOptions } from '../../utils/IOptions';
import { IData } from '../../utils/IData';

class Fill {
  private fill: HTMLElement;

  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.fill = createElement('div', { class: 'slider__fill' });
    this.init();
    this.renderFill = this.renderFill.bind(this);
  }

  public renderFill(state: IOptions, arg: Omit<IData, 'left' | 'idHandle'>): void {
    const {
      handleFirstPos, handleSecondPos, sliderPos, sliderLength,
    } = arg;
    const length = state.range
      ? handleSecondPos - handleFirstPos
      : handleFirstPos - sliderPos + 10;
    const shift = handleFirstPos - sliderPos + 10;

    const percentLength = (length / sliderLength) * 100;
    const percentShift = (shift / sliderLength) * 100;

    if (state.vertical) {
      this.fill.style.left = '';
      this.fill.style.width = '';
      this.fill.style.height = `${percentLength}%`;
      this.fill.style.top = '0';
      if (state.range) {
        this.fill.style.top = `${percentShift}%`;
      }
    } else {
      this.fill.style.top = '';
      this.fill.style.height = '';
      this.fill.style.width = `${percentLength}%`;
      this.fill.style.left = '0';
      if (state.range) {
        this.fill.style.left = `${percentShift}%`;
      }
    }
  }

  private init(): void {
    this.parent.appendChild(this.fill);
  }

  public getFill(): HTMLElement {
    return this.fill;
  }
}

export default Fill;
