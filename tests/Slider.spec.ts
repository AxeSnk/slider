import Slider from "../src/MVP/View/Slider/Slider";
import IOptions, { defaultOptions } from "../src/MVP/defaultOptions";

describe("Slider tests:", () => {
  let state: IOptions;
  let slider: Slider = new Slider(document.body);

  test("create slider element", () => {
    expect(slider.getElement()).toBeInstanceOf(HTMLElement);
  });

  test("renderSlider horizontal", () => {
    state = { ...defaultOptions, ...{ vertical: false } };
		slider.render(state);
		let element: HTMLElement = slider.getElement();

		expect(element.className).toBe("slider");
	});
	
	test("renderSlider vertical", () => {
    state = { ...defaultOptions, ...{ vertical: true } };
		slider.render(state);
		let element: HTMLElement = slider.getElement();

		expect(element.className).toBe("slider slider--vertical");
	});

});
