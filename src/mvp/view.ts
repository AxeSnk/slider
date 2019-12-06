import IOptions from './defaultOptions';

export interface IView {
  getSlider(): HTMLDivElement;
  getHandle(): HTMLDivElement;
  getTooltip(): HTMLDivElement;
  getMinPositionHandle(): number;
  getCurrentPositionHandle(): number;
}

export default class View implements IView {
  private wrapper: any;
  private slider: HTMLDivElement;
  private handle: HTMLDivElement;
  private tooltip: HTMLDivElement;
  
  constructor(options: IOptions, wrapper: any) {
    this.wrapper = wrapper;
    this.slider = this.createSlider();
    this.handle = this.createHandle(options);

    if (options.tooltip) {
      this.tooltip = this.createTooltip()
    }

    this.dragHandle(options);
  }

  createSlider(): HTMLDivElement {
    let slider: HTMLDivElement = document.createElement('div');
    slider.classList.add('slider');
    this.wrapper.appendChild(slider);

    return slider;
  }

  createHandle(options: IOptions): HTMLDivElement {
    let handle: HTMLDivElement = document.createElement('div');
    handle.classList.add('handle');
    this.slider.appendChild(handle);

    // установить первоначальную позицию handle
    handle.style.left = options.val + 'px';

    return handle;
  }

  createTooltip(): HTMLDivElement {
    let tooltip: HTMLDivElement = document.createElement('div');
    tooltip.classList.add('tooltip');
    this.handle.appendChild(tooltip);

    // значение в tooltip
    tooltip.innerHTML = '' + this.getCurrentPositionHandle().toFixed();

    // позиция tooltip
    tooltip.style.top = -this.handle.offsetHeight*1.4 + 'px';
    
    return tooltip   
  }

  dragHandle(options: IOptions): void {

    this.getSlider().onmousedown = (event: MouseEvent) => {
      event.preventDefault(); // предотвратить запуск выделения (действие браузера)

      let slider: HTMLDivElement = this.slider;
      let handle: HTMLDivElement = this.handle;
      let tooltip: HTMLDivElement = this.tooltip;
      let step = options.step;

      let leftMin = 0; // левый ограничитель
      let leftMax = slider.clientWidth - handle.offsetWidth;  // правый ограничитель
      let shiftX = handle.offsetWidth / 2; // сдвиг на полразмера ползунка

      moveMouse(event);

      document.onmousemove = (event: MouseEvent) => moveMouse(event);

      document.onmouseup = () => document.onmousemove = document.onmouseup = null;
    
      function moveMouse(event: MouseEvent) {
        let num = event.clientX
        let left = +num.toFixed() - +slider.getBoundingClientRect().left.toFixed() - shiftX; // выставляет ползунок под курсором

        // границы слайдера
        if (left < leftMin) {
          handle.style.left = leftMin + 'px';
        } else if (left > leftMax) {
          handle.style.left = leftMax + 'px';
        } else {
          handle.style.left = Math.round(left/step) * step + 'px';
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

  getSlider(): HTMLDivElement {
    return this.slider
  }

  getHandle(): HTMLDivElement {
    return this.handle
  }

  getTooltip(): HTMLDivElement {
    return this.tooltip
  }

  getCurrentPositionHandle(): number {
    let shiftX = this.handle.offsetWidth / 2; // сдвиг на полразмера ползунка
    let currentPos = this.handle.getBoundingClientRect().left - this.getMinPositionHandle() + shiftX;

    return currentPos
  }

  getMinPositionHandle(): any {
    let shiftX = this.handle.offsetWidth / 2; // сдвиг на полразмера ползунка
    let pos = this.slider.getBoundingClientRect().left + shiftX;
    return pos;
  }

}