import createElement from '../../utility';
import EventEmitter from '../../eventEmitter';

export default class Slider extends EventEmitter {
	private slider: HTMLElement;
	private parent: HTMLElement;

	constructor(parent: HTMLElement) {
		super();

		this.parent = parent;

		this.slider = createElement('div', { class: 'slider' });
		this.parent.appendChild(this.slider);
	}

	public getElement(): HTMLElement {
		return this.slider;
	}

	public getPosition(): number {
		return this.slider.getBoundingClientRect().left;
	}

	public getWidth(): number {
		return this.slider.offsetWidth;
	}

}