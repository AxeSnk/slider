import createElement from '../../utils/createElement';
import EventEmitter from '../../utils/EventEmitter';

import { IOptions } from '../../utils/IOptions';

class Scale extends EventEmitter {
  private scale!: HTMLElement;

  private parent: HTMLElement;

  private values!: HTMLElement;

  private state!: IOptions;

  constructor(parent: HTMLElement) {
    super();

    this.parent = parent;
    this.init();
    this.addListener();
  }

  public render(state: IOptions): void {
    this.state = state;
    if (state.scale) {
      this.scale.setAttribute('style', 'display: block');

      state.vertical
        ? this.scale.classList.add('scale--vertical')
        : this.scale.classList.remove('scale--vertical');

      this.renderValues(state);
    } else {
      this.scale.setAttribute('style', 'display: none');
    }
  }

  private init(): void {
    this.scale = createElement('div', { class: 'slider__scale' });
    this.values = createElement('div', { class: 'scale__values' });
    this.scale.appendChild(this.values);
    this.parent.appendChild(this.scale);
  }

  private renderValues(state: IOptions): void {
    const {
      minVal, maxVal, vertical, step,
    } = state;
    const elems: NodeListOf<ChildNode> = this.values.childNodes;

    this.clear(elems);

    const valStart: HTMLElement = createElement('div', {
      class: 'scale__value-item scale__value-item_start ',
    });

    valStart.innerHTML = `${minVal}`;
    this.values.appendChild(valStart);

    let i: number;
    const width = 100;
    const scope = maxVal - minVal;
    const numberOfSteps = Math.round(scope / step) * step;
    const gaps = 3;

    const interval = Math.round((numberOfSteps / gaps) / step) * step;
    let value = minVal;

    let left;

    for (i = 0; i < 2; i += 1) {
      value += interval;

      const newLeft = ((value - minVal) * width) / scope;
      left = newLeft;
      const valItem = createElement('div', {
        class: 'scale__value-item',
      });

      vertical
        ? valItem.setAttribute('style', `top: calc(${left}% + 10px)`)
        : valItem.setAttribute('style', `left: calc(${left}% + 10px)`);
      valItem.innerHTML = `${+value.toFixed(2)}`;
      this.values.appendChild(valItem);
    }

    left = 100;

    const valEnd = createElement('div', {
      class: 'scale__value-item scale__value-item_end',
    });

    vertical
      ? valEnd.setAttribute('style', `top: ${left}%`)
      : valEnd.setAttribute('style', `left: ${left}%`);
    valEnd.innerHTML = `${maxVal}`;
    this.values.appendChild(valEnd);
  }

  private clear = (elems: NodeListOf<ChildNode>): void => {
    while (elems.length) {
      elems.forEach((item) => {
        item.remove();
      });
    }
  };

  private addListener(): void {
    this.scale.addEventListener('mousedown', this.clickScale.bind(this));
  }

  private clickScale(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const { range, maxVal } = this.state;
    const isValStart = target.className.indexOf('scale__value-item_start') !== -1;
    const isValEnd = target.className.indexOf('scale__value-item_end') !== -1;

    const scaleX = this.scale.getBoundingClientRect().left;
    const scaleY = this.scale.getBoundingClientRect().top;
    const targetX = target.getBoundingClientRect().left;
    const targetY = target.getBoundingClientRect().top;
    const leftX = targetX - scaleX;
    const leftY = targetY - scaleY;

    if (range) {
      if (isValStart) {
        this.emit('clickScaleVal', { val: target.innerHTML });
      } else if (isValEnd) {
        this.emit('clickScaleValEnd', { valEnd: target.innerHTML });
      } else {
        this.emit('clickScaleValItem', { leftX, leftY });
      }
    }

    if (!range) {
      if (isValStart) {
        this.emit('clickScaleVal', { val: target.innerHTML });
        this.emit('clickScaleValEnd', { valEnd: maxVal });
      } else if (isValEnd) {
        this.emit('clickScaleVal', { val: target.innerHTML });
        this.emit('clickScaleValEnd', { valEnd: maxVal });
      } else {
        this.emit('clickScaleVal', { val: target.innerHTML });
        this.emit('clickScaleValEnd', { valEnd: maxVal });
      }
    }
  }
}

export default Scale;
