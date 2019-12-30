import 'mocha';
import { expect } from 'chai';
import Handle from '../src/mvp/view/handle/handle';

describe('Handle tests', () => {
	let handle: Handle = new Handle(document.body)

	it('Create handle element', () => {
		expect(handle.getHandle()).to.be.a('HTMLDivElement')
	});

	it('Render handle', () => {
		let value: number = 2;
		let shift: number = -3;
		let difference: number = 8;
		let sliderWidth: number = 400;

		handle.renderHandle(value, shift, difference, sliderWidth);
		let element: HTMLElement = document.querySelector('.slider__handle') as HTMLElement;
		expect(element.style.left).to.equal('237.5px');

		// Тест не проходит!!???
	});

});