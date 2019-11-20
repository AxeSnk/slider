import Model, { IModel } from './model';
import View, { IView } from './view';

export default class Presenter {

  private model: IModel;
  private view: IView;

  constructor(model: IModel, view: IView) {

    this.model = model;
    this.view = view;
    this.dragHandle();

  }

  dragHandle(): void {
    this.view.getSlider().onmousedown = (event: MouseEvent) => {
      event.preventDefault(); // предотвратить запуск выделения (действие браузера)

      let slider = this.view.getSlider();
      let handle = this.view.getHandle();

      let leftMin = 0; // левый ограничитель
      let leftMax = this.view.getSlider().clientWidth - this.view.getHandle().offsetWidth;  // правый ограничитель
      let shiftX = this.view.getHandle().offsetWidth / 2; // сдвиг на полразмера ползунка

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

      }    

    }

  }

}