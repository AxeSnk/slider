import Model, { IModel } from './model';

export interface IView {
  getSlider(): HTMLDivElement;
  getHandle(): HTMLDivElement;
  getTooltip(): HTMLDivElement;

}

export default class View implements IView {
  private model: IModel;
  private slider: HTMLDivElement;
  private handle: HTMLDivElement;
  private tooltip: HTMLDivElement;

  constructor(model: IModel, slider: HTMLDivElement, tooltip: HTMLDivElement) {
    this.model = model;
    this.slider = slider;
    this.tooltip = tooltip;

    this.init();
    this.dragHandle();

    if(true) {
      let lenght = this.model.getWidth();
      this.slider.style.width = lenght;
    }
    
    if (true) {
      this.handle = this.createHandle();
    }

    if (this.model.getTooltipMask()) {
      this.tooltip = this.createTooltip();
    }

    this.position();

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

  position(): void {
    let pos = this.model.getVal();
    this.getHandle().style.left = pos + 'px';
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
    
      function moveMouse(event: MouseEvent) {// выставляет ползунок под курсором

        let left = event.clientX - slider.getBoundingClientRect().left - shiftX;
        
        if (left < leftMin) {
          handle.style.left = leftMin + 'px';
        } else if (left > leftMax) {
          handle.style.left = leftMax + 'px';
        } else {
          handle.style.left = left + 'px';
        }

        // отображение tooltip
        if (model.getTooltipMask()) {
          tooltip.innerHTML = '' + left;

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

}