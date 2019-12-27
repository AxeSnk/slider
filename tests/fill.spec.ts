import 'mocha';
import { expect, assert } from 'chai';
import Fill from '../src/mvp/view/fill/fill';

describe('Fill tests', () => {
	let fill: Fill = new Fill(document.body)

	it('Create fill element', () => {
		expect(fill.getFill()).to.be.a('HTMLDivElement')
	});

});