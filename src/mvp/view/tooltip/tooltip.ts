import createElement from '../../utility';
import EventEmitter from '../../eventEmitter';

export default class Tooltip extends EventEmitter {
	private tooltip: HTMLElement;
	private parent: HTMLElement;

	constructor(parent: HTMLElement) {
		super();

		this.parent = parent;

		this.tooltip = createElement('div', { class: 'slider__tooltip' });
		this.parent.appendChild(this.tooltip);
	}

	public renderTooltip(val: number, minVal: number, maxVal: number, handleHeight: number): void {
		if(val < minVal) {
			this.tooltip.innerHTML = `${minVal}`;
		} else if(val > maxVal) {
			this.tooltip.innerHTML = `${maxVal}`;
		} else {
			this.tooltip.innerHTML = `${val}`;
		}

		this.tooltip.style.top = -handleHeight * 1.4 + 'px';
	}

	public getTooltip(): HTMLElement {
		return this.tooltip;
	}

}
