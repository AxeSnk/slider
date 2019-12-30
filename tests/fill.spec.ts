import 'mocha';
import { expect } from 'chai';
import Fill from '../src/mvp/view/fill/fill';

describe('Fill tests', () => {
	let fill: Fill = new Fill(document.body)

	it('Create fill element', () => {
		expect(fill.getFill()).to.be.a('HTMLDivElement')
	});

	it('Render fill', () => {
		let width: number = 80;
		fill.renderFill(width);
		let element: HTMLElement = document.querySelector('.slider__fill') as HTMLElement;
		expect(element.style.width).to.equal(width + 'px');
	});

});