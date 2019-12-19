import IOptions from './defaultOptions';

export interface IView {

  getMinPositionHandle(): number;
  getCurrentPositionHandle(): number;
  renderHandle(value, shift, range): void;
  createDivisionScale( arrLenght: number ): void;
  arrangeValuesOnTheScale( arrLenght: number ): void;

}

export default class View implements IView {

  private wrapper: any;
  private slider: HTMLDivElement;
  private fill: HTMLDivElement;
  private handle: HTMLDivElement;
  private tooltip: HTMLDivElement;
  private scale: HTMLDivElement;
  
  constructor( options: IOptions, wrapper: any ) {
    this.wrapper = wrapper;
    this.slider = this.createSlider();
    this.handle = this.createHandle();
    this.fill = this.createFill();
    this.scale = this.createScale();

    if (options.tooltip) {
      this.tooltip = this.createTooltip()
    }


    this.dragHandle(options);

  }

  renderHandle(value, shift, range): void {

    // let stepSize = (this.slider.offsetWidth-this.handle.offsetWidth)/numSteps; // размер шага
    let shiftX = this.handle.offsetWidth / 2; // сдвиг на полразмера ползунка

    let width = this.slider.offsetWidth - this.handle.offsetWidth;
    
    let newLeft = (value - shift) * width / range;

    this.handle.style.left = newLeft + 'px';
    this.fill.style.width = this.handle.getBoundingClientRect().left - this.slider.getBoundingClientRect().left + shiftX + 'px';

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

    // значение в tooltip
    tooltip.innerHTML = '' + this.getCurrentPositionHandle().toFixed();

    // позиция tooltip
    tooltip.style.top = -this.handle.offsetHeight*1.4 + 'px';
    
    return tooltip   
  }

  dragHandle(options: IOptions): void {

    this.slider.onmousedown = (event: MouseEvent) => {
      event.preventDefault(); // предотвратить запуск выделения (действие браузера)

      let slider: HTMLDivElement = this.slider;
      let handle: HTMLDivElement = this.handle;
      let tooltip: HTMLDivElement = this.tooltip;
      let fill: HTMLDivElement = this.fill;
      let step = options.step;

      let leftMin = 0; // левый ограничитель
      let leftMax = slider.clientWidth - handle.offsetWidth;  // правый ограничитель
      let shiftX = handle.offsetWidth / 2; // сдвиг на полразмера ползунка

      let widthSlider = this.slider.offsetWidth;
      let numSteps = (options.maxVal-options.minVal)/step; // кол-во шагов
      let stepSize = (widthSlider-handle.offsetWidth)/numSteps; // размер шага
      
      moveMouse(event);

      document.onmousemove = (event: MouseEvent) => moveMouse(event);

      document.onmouseup = () => document.onmousemove = document.onmouseup = null;
    
      function moveMouse(event: MouseEvent) {
        let left = +(event.clientX - slider.getBoundingClientRect().left - shiftX).toFixed(); // выставляет ползунок под курсором
        // границы слайдера
        if (left < leftMin) {
          handle.style.left = leftMin + 'px';
        } else if (left > leftMax) {
          handle.style.left = leftMax + 'px';
        } else {
          handle.style.left = Math.round(left/stepSize) * stepSize + 'px';
          fill.style.width = handle.getBoundingClientRect().left - slider.getBoundingClientRect().left + shiftX + 'px';
        }

        // отображение tooltip
        if (options.tooltip) {

           // значение в tooltip
          if (left < leftMin) {
            tooltip.innerHTML = leftMin + '';
          } else if (left > leftMax) {
            tooltip.innerHTML = leftMax + '';
          } else {
            tooltip.innerHTML = Math.round(left/step) * step + '';
          }

          // позиция tooltip
          tooltip.style.top = - handle.offsetHeight*1.4 + 'px';
        }
      }    

    }

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

  createDivisionScale( arrLenght: number ): void {

    for( let i = 0; i < arrLenght; i++ ) {
      let division = document.createElement( 'div' );
      division.classList.add( 'slider__scale-division' );
      division.id = `slider__scale-division-${i}`;
      this.scale.appendChild( division );

      let division__text = document.createElement( 'div' );
      division__text.classList.add( 'division__text' );
      division.appendChild( division__text );
    };
  }

  arrangeValuesOnTheScale( arrLenght: number ): void { // расставить значения на шкале

    for( let i = 0; i < arrLenght; i++ ) {
      document.getElementById( `slider__scale-division-${i}` ).firstElementChild.innerHTML = `${i}`;
    }

  }


}