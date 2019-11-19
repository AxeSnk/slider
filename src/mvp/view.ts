import Model from "./model";
import IOptions from './defaultOptions';

export interface IView {
}

export default class View {
    private wrapper: HTMLDivElement;
    private slider: HTMLDivElement;
    private handle: HTMLDivElement;
    private tooltip?: HTMLDivElement;

    constructor(wrapper: HTMLDivElement, slider: HTMLDivElement, handle: HTMLDivElement) {
        this.wrapper = wrapper;
        this.slider = slider;
        this.handle = handle;
        this.init();
        this.dragHandle();
    }

    init(): void {
        this.slider = document.createElement('div');
        this.slider.classList.add('slider');
        this.wrapper.appendChild(this.slider);
        this.handle = document.createElement('div');
        this.handle.classList.add('handle');
        this.slider.appendChild(this.handle);
    }

    dragHandle(): void {

        this.slider.onmousedown = (event: MouseEvent) => {
            event.preventDefault(); // предотвратить запуск выделения (действие браузера)

            let slider = this.slider;
            let handle = this.handle;

            let leftMin = 0; // левый ограничитель
            let leftMax = this.slider.clientWidth - this.handle.offsetWidth;  // правый ограничитель
            let shiftX = this.handle.offsetWidth / 2; // сдвиг на полразмера ползунка

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