import EventEmitter from './eventEmitter';

export interface IView extends EventEmitter {
  
  getMinPositionHandle(): number;
  getCurrentPositionHandle(): number;
  renderHandle( value: number, shift: number, range: number ): void;
  createDivisionScale( arrrayOfDivisions: number[] ): void;
  arrangeValuesOnTheScale( arrrayOfDivisions: number[] ): void;
  renderTooltip(): void;
  dragHandle(event: MouseEvent): void;
  setValueTooltip( val: number ): void;
}

export default class View extends EventEmitter implements IView {

  private wrapper: any;
  private slider: HTMLDivElement;
  private fill: HTMLDivElement;
  private handle: HTMLDivElement;
  private tooltip: HTMLDivElement;
  private scale: HTMLDivElement;
  private shift: number;
  private range: number;
  
  constructor( wrapper: any ) {
    super();

    this.wrapper = wrapper;
    this.slider = this.createSlider();
    this.handle = this.createHandle();
    this.fill = this.createFill();
    this.scale = this.createScale();

    this.handle.addEventListener('mousedown', this.dragHandle.bind(this));
  }

  renderTooltip(): void {

    this.tooltip = this.createTooltip()

  }

  renderHandle( value: number, shift: number, range: number ): void {

    this.shift = shift;
    this.range = range;
    let width = this.slider.offsetWidth - this.handle.offsetWidth;
    
    let newLeft = (value - this.shift) * width / this.range;

    this.handle.style.left = newLeft + 'px';
    this.fill.style.width = this.handle.getBoundingClientRect().left - this.slider.getBoundingClientRect().left + this.handle.offsetWidth / 2 + 'px';

  }

  createSlider(): HTMLDivElement {
    let slider: HTMLDivElement = document.createElement('div');
    slider.classList.add('slider');
    this.wrapper.appendChild(slider);

    return slider;
  }

  createFill(): HTMLDivElement {
    let fill: HTMLDivElement = document.createElement('div');
    fill.classList.add('slider__fill');
    this.slider.appendChild(fill);

    // установить первоначальное заполнение, относительно val
    let shiftX = this.handle.offsetWidth / 2; // сдвиг на полразмера ползунка

    fill.style.width = this.handle.getBoundingClientRect().left - this.slider.getBoundingClientRect().left + shiftX + 'px';

    return fill;
  }

  createHandle(): HTMLDivElement {
    let handle: HTMLDivElement = document.createElement('div');
    handle.classList.add('slider__handle');
    this.slider.appendChild(handle);

    return handle;
  }

  createTooltip(): HTMLDivElement {
    let tooltip: HTMLDivElement = document.createElement('div');
    tooltip.classList.add('slider__tooltip');
    this.handle.appendChild(tooltip);

    // позиция tooltip
    tooltip.style.top = -this.handle.offsetHeight*1.4 + 'px';
    
    return tooltip   
  }

  setValueTooltip( val: number ): void {

    this.tooltip.innerHTML = val + '';

  }

  dragHandle(event: MouseEvent): void {
    let handle = event.target as HTMLElement;
    let handleX = handle.offsetLeft;
    let mouseX = event.clientX;

    event.preventDefault(); // предотвратить запуск выделения (действие браузера)

    let moveHandle = (moveEvent: MouseEvent) => {
      let leftX = handleX + moveEvent.clientX - mouseX + handle.offsetWidth / 2;
      let width = this.slider.offsetWidth;
      this.emit('drag', { leftX, width });
    }

    window.addEventListener('mousemove', moveHandle);

    let handleMouseUp = () => {
      window.removeEventListener('mousemove', moveHandle);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mouseup', handleMouseUp);
  }

  getCurrentPositionHandle(): number {
    let shiftX = this.handle.offsetWidth / 2; // сдвиг на полразмера ползунка
    let currentPos = this.handle.getBoundingClientRect().left - this.getMinPositionHandle() + shiftX;

    return currentPos
  }

  getMinPositionHandle(): number {
    let shiftX = this.handle.offsetWidth / 2; // сдвиг на полразмера ползунка
    let pos = this.slider.getBoundingClientRect().left + shiftX;

    return pos;
  }

  getMaxPositionHandle(): number {
    let shiftX = this.handle.offsetWidth / 2; // сдвиг на полразмера ползунка
    let pos = this.slider.getBoundingClientRect().right - shiftX;

    return pos;
  }

  createScale(): HTMLDivElement {

    let scale: HTMLDivElement = document.createElement( 'div' );
    scale.classList.add( 'slider__scale' );
    scale.style.width = this.getMaxPositionHandle() - this.getMinPositionHandle() + 'px';
    scale.style.left = this.handle.offsetWidth / 2 + 'px';
    this.slider.appendChild( scale );
    
    return scale;

  }

  createDivisionScale( arrrayOfDivisions: number[] ): void {

    for( let i = 0; i < arrrayOfDivisions.length; i++ ) {
      let division = document.createElement( 'div' );
      division.classList.add( 'slider__scale-division' );
      division.id = `slider__scale-division-${i}`;
      this.scale.appendChild( division );

      let division__text = document.createElement( 'div' );
      division__text.classList.add( 'division__text' );
      division.appendChild( division__text );
    };
  }

  arrangeValuesOnTheScale( arrrayOfDivisions: number[] ): void { // расставить значения на шкале

    for( let i = 0; i < arrrayOfDivisions.length; i++ ) {
      document.getElementById( `slider__scale-division-${i}` ).firstElementChild.innerHTML = arrrayOfDivisions[i] + '';
    }

  }


}