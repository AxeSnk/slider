import createElement from '../../utils/createElement';
import EventEmitter from '../../utils/EventEmitter';

class Tooltip extends EventEmitter {
  private tooltip: HTMLElement;

  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    super();

    this.parent = parent;
    this.tooltip = createElement('div', { class: 'slider__tooltip' });
    this.init();
  }

  public renderTooltip(
    arg: { tooltip: boolean, val: number, minVal: number, maxVal: number },
  ): void {
    const {
      tooltip, val, minVal, maxVal,
    } = arg;
    if (tooltip) {
      this.tooltip.setAttribute('style', 'display: block');
    } else {
      this.tooltip.setAttribute('style', 'display: none');
    }

    if (val < minVal) {
      this.tooltip.innerHTML = `${minVal}`;
    } else if (val > maxVal) {
      this.tooltip.innerHTML = `${maxVal}`;
    } else {
      this.tooltip.innerHTML = `${val}`;
    }
  }

  private init(): void {
    this.parent.appendChild(this.tooltip);
  }

  public getTooltip(): HTMLElement {
    return this.tooltip;
  }
}

export default Tooltip;
