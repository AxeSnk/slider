import EventEmitter from './eventEmitter';
import createElement from './util';

export interface IView extends EventEmitter {
  renderHandle( value: number, shift: number, range: number ): void;
  renderFill(): void;
  renderTooltip(val: number): void;
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

    this.createElements();

    this.handle.addEventListener('mousedown', this.dragHandle.bind(this));
  }

  private createElements(): void {
    this.slider = createElement('div', { className: 'slider' })  
    this.root.appendChild(this.slider);

    this.fill = createElement('div', { className: 'slider__fill' })  
    this.slider.appendChild(this.fill);

    this.handle = createElement('div', { className: 'slider__handle' })
    this.slider.appendChild(this.handle);
    
    this.tooltip = createElement('div', { className: 'slider__tooltip' })
    this.handle.appendChild(this.tooltip);

    this.scale = createElement('div', { className: 'slider__scale' })
    this.slider.appendChild(this.scale);
  }

  public renderHandle(value: number, shift: number, range: number): void {
    let width: number = this.slider.offsetWidth - this.handle.offsetWidth;
    let newLeft: number = (value - shift) * width / range;

    this.handle.style.left = newLeft + 'px';
    this.fill.style.width = this.handle.getBoundingClientRect().left - this.slider.getBoundingClientRect().left + this.handle.offsetWidth / 2 + 'px';
  }

  public renderFill(): void {
    this.fill.style.width = this.handle.getBoundingClientRect().left - this.slider.getBoundingClientRect().left + (this.handle.offsetWidth / 2) + 'px';
  }

  public renderTooltip(val: number): void {
    this.tooltip.innerHTML = val + '';
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
      document.getElementById(`slider__scale-division-${i}`).firstElementChild.innerHTML = `${arrrayOfDivisions[i]}`;
    }
  }

}