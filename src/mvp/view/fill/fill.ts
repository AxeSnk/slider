import createElement from '../../utility';
import EventEmitter from '../../eventEmitter';

export default class Fill extends EventEmitter {
	private fill: HTMLElement;
	private parent: HTMLElement;

	constructor(parent: HTMLElement) {
		super()

		this.parent = parent;

		this.fill = createElement('div', { class: 'slider__fill' });
		this.parent.appendChild(this.fill);
	}

	public renderFill(width: number): void {
		this.fill.style.width = width + 'px';
	}

	public makeVertical(height: number): void {
		this.fill.classList.add('fill--vertical')
		this.fill.style.width = '100%';
		this.fill.style.height = height + 'px';
	}

	public getFill(): HTMLElement {
		return this.fill;
	}
	
}
