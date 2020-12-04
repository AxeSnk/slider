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

      this.renderValues(state);
    } else {
      this.scale.setAttribute('style', 'display: none');
    }
  }

  private init(): void {
    this.scale = createElement('div', { class: 'slider__scale' });
    this.values = createElement('div', { class: 'slider__scale-values' });
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
      class: 'slider__scale-value-item slider__scale-value-item_start',
    });

    valStart.innerHTML = `${minVal}`;
    this.values.appendChild(valStart);

    const width = 100;
    const scope = maxVal - minVal;
    let gaps = Math.ceil(scope / step);
    let interval = Math.round(scope / (scope / step));
    const numberOfDivisions = 3;
    if (gaps > numberOfDivisions) {
      gaps = numberOfDivisions;
      interval = Math.round(scope / gaps);
    }
    let value = minVal;

    let i: number;
    let left;

    for (i = 1; i < gaps; i += 1) {
      value += interval;

      const newLeft = ((value - minVal) * width) / scope;
      left = newLeft;
      const valItem = createElement('div', {
        class: 'slider__scale-value-item',
      });

      if (vertical) {
        valItem.setAttribute('style', `top: ${left}%`);
      } else {
        valItem.setAttribute('style', `left: ${left}%`);
      }
      valItem.innerHTML = `${Number(value.toFixed(2))}`;
      this.values.appendChild(valItem);
    }

    left = 100;

    const valEnd = createElement('div', {
      class: 'slider__scale-value-item slider__scale-value-item_end',
    });

    if (vertical) {
      valEnd.setAttribute('style', `top: ${left}%`);
    } else {
      valEnd.setAttribute('style', `left: ${left}%`);
    }
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
    const isValStart = target.className.indexOf('slider__scale-value-item_start') !== -1;
    const isValEnd = target.className.indexOf('slider__scale-value-item_end') !== -1;

    const scaleX = this.scale.getBoundingClientRect().left;
    const scaleY = this.scale.getBoundingClientRect().top;
    const targetX = target.getBoundingClientRect().left;
    const targetY = target.getBoundingClientRect().top;
    const leftX = targetX - scaleX + 10;
    const leftY = targetY - scaleY + 10;

    if (range) {
      if (isValStart) {
        this.emit('clickScaleVal', { ...this.state, val: target.innerHTML });
      } else if (isValEnd) {
        this.emit('clickScaleValEnd', { ...this.state, valEnd: target.innerHTML });
      } else {
        this.emit('clickScaleValItem', { leftX, leftY });
      }
    }

    if (!range) {
      if (isValStart) {
        this.emit('clickScaleVal', { ...this.state, val: target.innerHTML });
        this.emit('clickScaleValEnd', { ...this.state, valEnd: maxVal });
      } else if (isValEnd) {
        this.emit('clickScaleVal', { ...this.state, val: target.innerHTML });
        this.emit('clickScaleValEnd', { ...this.state, valEnd: maxVal });
      } else {
        this.emit('clickScaleVal', { ...this.state, val: target.innerHTML });
        this.emit('clickScaleValEnd', { ...this.state, valEnd: maxVal });
      }
    }
  }
}

export default Scale;
