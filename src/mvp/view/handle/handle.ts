import createElement from '../../utility';
import EventEmitter from '../../eventEmitter';
import Tooltip from './../tooltip/tooltip';

export default class Handle extends EventEmitter {
	private handle: HTMLElement;
	private tooltip: Tooltip;
	private parent: HTMLElement;
	private position: number = 0;

	constructor(parent: HTMLElement) {
		super();

		this.parent = parent;

		this.handle = createElement('div', { class: 'slider__handle' });
		this.parent.appendChild(this.handle);

		this.handle.addEventListener('mousedown', this.dragHandle.bind(this));

		this.tooltip = new Tooltip(this.handle);
	}

	private dragHandle(event: MouseEvent): void {
    let handle: HTMLElement = event.target as HTMLElement;
    let handleX: number = handle.offsetLeft;
    let mouseX: number = event.clientX;

    event.preventDefault(); // предотвратить запуск выделения (действие браузера)

    let moveHandle = (moveEvent: MouseEvent): void => {
      let leftX: number = handleX + moveEvent.clientX - mouseX + handle.offsetWidth / 2;
      this.emit('drag', { leftX });
    }

    window.addEventListener('mousemove', moveHandle);

    let handleMouseUp = (): void => {
      window.removeEventListener('mousemove', moveHandle);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mouseup', handleMouseUp);
	}

	public renderTooltip(val: number, minVal: number, maxVal: number, handleHeight: number): void {
		this.tooltip.renderTooltip(val, minVal, maxVal, handleHeight)
	}
	
	public updateTooltip(minVal: number, maxVal: number, handleHeight: number, position: number, width: number): void {
		this.tooltip.updateTooltip(minVal, maxVal, handleHeight, position, width);
	}

	public renderHandle(sliderWidth: number, value: number, shift: number, difference: number): void {
		let width: number = sliderWidth - this.handle.offsetWidth;
		let newLeft: number = (value - shift) * width / difference;
		
    if(newLeft < 0) {
      this.handle.style.left = 0 + 'px';
    } else if(newLeft > width) {
      this.handle.style.left = width + 'px';
    } else {
      this.handle.style.left = newLeft + 'px';
		}
	}

	public updateHandle(value: number, shift: number, difference: number, sliderWidth: number, step: number): void {
    let width: number = sliderWidth - this.handle.offsetWidth;
		let stepCount: number = difference / step;
		let stepSize: number = width / stepCount;

		let newLeft: number = (value - shift) * width / difference;

		let pos: number = Math.round(newLeft / stepSize) * stepSize;
		this.position = pos;


    if(pos < 0) {
      this.handle.style.left = 0 + 'px';
    } else if(pos > width) {
      this.handle.style.left = width + 'px';
    } else {
      this.handle.style.left = pos + 'px';
		}
	}
	
	public getPosition(): number {
		return this.handle.getBoundingClientRect().left;
	}

	public getWidth(): number {
		return this.handle.offsetWidth;
	}

	public getHeight(): number {
		return this.handle.offsetHeight;
	}

	public getHandle(): HTMLElement {
		return this.handle;
	}

	public getPositionHandle(): number {
		return this.position;
	}

}
