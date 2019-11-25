import Model, { IModel } from './model';

export interface IView {
  getSlider(): HTMLDivElement;
  getHandle(): HTMLDivElement;
  getTooltip(): HTMLDivElement;
  getMinPositionHandle(): number;
  getCurrentPositionHandle(): number;
}

export default class View implements IView {
  private model: IModel;
  private slider: HTMLDivElement;
  private handle: HTMLDivElement;
  private tooltip: HTMLDivElement;

  constructor(model: IModel, slider: HTMLDivElement) {
    this.model = model;
    this.slider = slider;

    this.init();
    this.dragHandle();

    if(true) {
      let lenght = this.model.getWidth();
      this.slider.style.width = lenght;
    }
    
    if (true) {
      this.handle = this.createHandle();
    
      // установить первоначальную позицию handle
      this.handle.style.left = this.model.getVal() + 'px';
    }

    if (this.model.getTooltipMask()) {

      this.tooltip = this.createTooltip();

      // значение в tooltip
      this.tooltip.innerHTML = '' + this.getCurrentPositionHandle();

      // позиция tooltip
      let leftTooltip = this.handle.getBoundingClientRect().left + (this.handle.offsetWidth - this.tooltip.offsetWidth) / 2;
      if (leftTooltip < 0) leftTooltip = 0;

      let topTooltip = this.handle.getBoundingClientRect().top - this.tooltip.offsetHeight - 5;
      if (topTooltip < 0) {
        topTooltip = this.handle.getBoundingClientRect().top + this.handle.offsetWidth + 5;
      }

      this.tooltip.style.left = leftTooltip + 'px';
      this.tooltip.style.top = topTooltip + 'px';
      
    }

  }

  init(): void {
    this.slider.classList.add('slider');
  }

  createHandle(): HTMLDivElement {
    let handle: HTMLDivElement = document.createElement('div');
    handle.classList.add('handle');
    this.slider.appendChild(handle);
    
    return handle;
  }

  createTooltip(): HTMLDivElement {
    let tooltip: HTMLDivElement = document.createElement('div');
    tooltip.classList.add('tooltip');
    this.handle.appendChild(tooltip);

    return tooltip
  }

  dragHandle(): void {

    this.getSlider().onmousedown = (event: MouseEvent) => {
      event.preventDefault(); // предотвратить запуск выделения (действие браузера)

      let slider: HTMLDivElement = this.getSlider();
      let handle: HTMLDivElement = this.getHandle();
      let tooltip: HTMLDivElement = this.getTooltip();
      let model = this.model;

      let leftMin = 0; // левый ограничитель
      let leftMax = slider.clientWidth - handle.offsetWidth;  // правый ограничитель
      let shiftX = handle.offsetWidth / 2; // сдвиг на полразмера ползунка

      moveMouse(event);

      document.onmousemove = (event: MouseEvent) => moveMouse(event);

      document.onmouseup = () => document.onmousemove = document.onmouseup = null;
    
      function moveMouse(event: MouseEvent) {
        
        let left = event.clientX - slider.getBoundingClientRect().left - shiftX; // выставляет ползунок под курсором

        // границы слайдера
        if (left < leftMin) {
          handle.style.left = leftMin + 'px';
        } else if (left > leftMax) {
          handle.style.left = leftMax + 'px';
        } else {
          handle.style.left = left + 'px';
        }

        // отображение tooltip
        if (model.getTooltipMask()) {

           // значение в tooltip
          if (left < leftMin) {
            tooltip.innerHTML = leftMin + '';
          } else if (left > leftMax) {
            tooltip.innerHTML = leftMax + '';
          } else {
            tooltip.innerHTML = left + '';
          }

          // позиция tooltip
          let leftTooltip = handle.getBoundingClientRect().left + (handle.offsetWidth - tooltip.offsetWidth) / 2;
          if (leftTooltip < 0) leftTooltip = 0;

          let topTooltip = handle.getBoundingClientRect().top - tooltip.offsetHeight - 5;
          if (topTooltip < 0) {
            topTooltip = handle.getBoundingClientRect().top + handle.offsetWidth + 5;
          }

          tooltip.style.left = leftTooltip + 'px';
          tooltip.style.top = topTooltip + 'px';
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

  getTooltip(): HTMLDivElement{
    return this.tooltip
  }

  getCurrentPositionHandle(): number {
    let shiftX = this.handle.offsetWidth / 2; // сдвиг на полразмера ползунка
    let currentPos = this.handle.getBoundingClientRect().left - this.getMinPositionHandle() + shiftX;

    return currentPos
  }

  getMinPositionHandle(): any {
    let shiftX = this.handle.offsetWidth / 2; // сдвиг на полразмера ползунка
    let pos = this.slider.getBoundingClientRect().left + 1 + shiftX; // 1 - рамка 1px
  
    return pos;
  }

}