import createElement from '../../utility';
import EventEmitter from '../../eventEmitter';
import Tooltip from './../tooltip/tooltip';

export default class Handle extends EventEmitter {
	private handle: HTMLElement;
	private tooltip: Tooltip;
  private parent: HTMLElement;

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
		this.tooltip.renderTooltip(val, minVal, maxVal, handleHeight);
	}

	public renderHandle(value: number, shift: number, range: number, sliderWidth: number): void {
    let width: number = sliderWidth - this.handle.offsetWidth;
    let newLeft: number = (value - shift) * width / range;

    if(newLeft < 0) {
      this.handle.style.left = 0 + 'px';
    } else if(newLeft > width) {
      this.handle.style.left = width + 'px';
    } else {
      this.handle.style.left = newLeft + 'px';
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

}
