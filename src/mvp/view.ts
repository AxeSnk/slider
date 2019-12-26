import EventEmitter from './eventEmitter';
import createElement from './utility';

export interface IView extends EventEmitter {
  renderHandle( value: number, shift: number, range: number ): void;
  renderFill(): void;
  renderTooltip(val: number, minVal: number, maxVal: number): void;
  renderScale(arrrayOfDivisions: number[]): void;
}

export default class View extends EventEmitter implements IView {

  private root: HTMLElement;
  private slider: HTMLElement;
  private fill: HTMLElement;
  private handle: HTMLElement;
  private tooltip: HTMLElement;
  private scale: HTMLElement;
  
  constructor(root: HTMLElement) {
    super();

    this.root = root;
    this.slider = this.createSlider();
    this.fill = this.createFill();
    this.handle = this.createHandle();
    this.tooltip = this.createTooltip();
    this.scale = this.createScale();

    this.handle.addEventListener('mousedown', this.dragHandle.bind(this));
  }

  private createSlider(): HTMLElement {
    let slider = createElement('div', { class: 'slider' })  
    this.root.appendChild(slider);

    return slider;
  }

  private createFill(): HTMLElement {
    let fill = createElement('div', { class: 'slider__fill' });
    this.slider.appendChild(fill);

    return fill;
  }

  private createHandle(): HTMLElement {
    let handle = createElement('div', { class: 'slider__handle' })
    this.slider.appendChild(handle);

    return handle
  }

  private createTooltip(): HTMLElement {
    let tooltip = createElement('div', { class: 'slider__tooltip' })
    this.handle.appendChild(tooltip);

    return tooltip;
  }

  private createScale(): HTMLElement {
    let scale = createElement('div', { class: 'slider__scale' })
    this.slider.appendChild(scale);

    return scale;
  }

  public renderHandle(value: number, shift: number, range: number): void {
    let width: number = this.slider.offsetWidth - this.handle.offsetWidth;
    let newLeft: number = (value - shift) * width / range;

    if(newLeft < 0) {
      this.handle.style.left = 0 + 'px';
    } else if(newLeft > width) {
      this.handle.style.left = width + 'px';
    } else {
      this.handle.style.left = newLeft + 'px';
    }
    this.fill.style.width = this.handle.getBoundingClientRect().left - this.slider.getBoundingClientRect().left + this.handle.offsetWidth / 2 + 'px';
  }

  public renderFill(): void {
    this.fill.style.width = this.handle.getBoundingClientRect().left - this.slider.getBoundingClientRect().left + (this.handle.offsetWidth / 2) + 'px';
  }

  public renderTooltip(val: number, minVal: number, maxVal: number): void {
    if(val < minVal) {
      this.tooltip.innerHTML = `${minVal}`;
    } else if(val > maxVal) {
      this.tooltip.innerHTML = `${maxVal}`;
    } else {
      this.tooltip.innerHTML = `${val}`;
    }

    this.tooltip.style.top = -this.handle.offsetHeight*1.4 + 'px';
  }

  public renderScale(arrrayOfDivisions: number[]): void {
    this.createDivisionScale(arrrayOfDivisions);
    this.arrangeValuesOnTheScale(arrrayOfDivisions);

    this.scale.style.width = this.slider.offsetWidth - this.handle.offsetWidth + 'px';
    this.scale.style.left = this.handle.offsetWidth / 2 + 'px';
  }

  private dragHandle(event: MouseEvent): void {
    let handle: HTMLElement = event.target as HTMLElement;
    let handleX: number = handle.offsetLeft;
    let mouseX: number = event.clientX;

    event.preventDefault(); // предотвратить запуск выделения (действие браузера)

    let moveHandle = (moveEvent: MouseEvent): void => {
      let leftX: number = handleX + moveEvent.clientX - mouseX + handle.offsetWidth / 2;
      let width: number = this.slider.offsetWidth;
      this.emit('drag', { leftX, width });
    }

    window.addEventListener('mousemove', moveHandle);

    let handleMouseUp = (): void => {
      window.removeEventListener('mousemove', moveHandle);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mouseup', handleMouseUp);
  }

  private createDivisionScale(arrrayOfDivisions: number[]): void {
    for(let i: number = 0; i < arrrayOfDivisions.length; i++) {
      let division: HTMLElement = document.createElement('div');
      division.classList.add('slider__scale-division');
      division.id = `slider__scale-division-${i}`;
      this.scale.appendChild(division);

      let division__text: HTMLElement = document.createElement('div');
      division__text.classList.add('division__text');
      division.appendChild(division__text);
    };
  }

  private arrangeValuesOnTheScale(arrrayOfDivisions: number[]): void { 
    // расставить значения на шкале
    for( let i: number = 0; i < arrrayOfDivisions.length; i++ ) {
      document.getElementById(`slider__scale-division-${i}`)!.firstElementChild!.innerHTML = `${arrrayOfDivisions[i]}`;
    }
  }

}