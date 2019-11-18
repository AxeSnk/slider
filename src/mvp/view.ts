import Model from "./model";
import IOptions from './defaultOptions';

export interface IView {
}

export default class View {
    private wrapper: HTMLDivElement;
    private slider: HTMLDivElement;
    private handle: HTMLDivElement;
    private tooltip?: HTMLDivElement;
    shiftX: number;

    constructor(wrapper: HTMLDivElement, slider: HTMLDivElement, handle: HTMLDivElement, shiftX: number,) {
        this.wrapper = wrapper;
        this.slider = slider;
        this.handle = handle;
        this.shiftX = shiftX;
        this.init();
        this.mouseDown();

    }

    init(): void {
        this.slider = document.createElement('div');
        this.slider.classList.add('slider');
        this.wrapper.appendChild(this.slider);
        this.handle = document.createElement('div');
        this.handle.classList.add('handle');
        this.slider.appendChild(this.handle);

        document.addEventListener('mousemove', this.mouseMove.bind(this));
        document.addEventListener('mouseup', this.mouseUp.bind(this));    

        // this.mouseDown();
    }

    mouseDown(): void {
        this.handle.onmousedown = (event) => {
            event.preventDefault(); // предотвратить запуск выделения (действие браузера)

            this.shiftX = event.clientX - this.handle.getBoundingClientRect().left;
            
            // document.addEventListener('mousemove', this.mouseMove.bind(this));
            // document.addEventListener('mouseup', this.mouseUp.bind(this));    
    
        }
    }

    mouseMove(event: any): void {

        let newLeft = event.clientX - this.shiftX - this.slider.getBoundingClientRect().left;;
        
        // курсор вышел из слайдера => оставить бегунок в его границах.
        if (newLeft < 0) {
            newLeft = 0;
          }
          let rightEdge = this.slider.offsetWidth - this.handle.offsetWidth;
          if (newLeft > rightEdge) {
            newLeft = rightEdge;
          }
  
        this.handle.style.left = newLeft + 'px';
    }

    mouseUp(): void {
        console.log('mouse up')
        document.removeEventListener('mouseup', this.mouseUp);
        document.removeEventListener('mousemove', this.mouseMove);
    }

}