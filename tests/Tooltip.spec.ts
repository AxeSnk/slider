import Tooltip from "../src/MVP/View/Tooltip/Tooltip";

describe("Tooltip tests:", () => {
	let tooltip: Tooltip;
	
	beforeEach(() => {
    tooltip = new Tooltip(document.body)
  })

  test("create tooltip element", () => {
    expect(tooltip.getTooltip()).toBeInstanceOf(HTMLElement);
	});
	
	describe("renderTooltip", () => {
		const val: number = 2;
		const minVal: number = -3;
		const maxVal: number = 5;

		test("renderTooltip horizontal mask = true", () => {
			const tooltipMask: boolean = true;
			const vertical: boolean = false;
	
			tooltip.renderTooltip(
				tooltipMask,
				val,
				minVal,
				maxVal,
				vertical,
			);
			let element: HTMLElement = tooltip.getTooltip();
			expect(element.innerHTML).toBe("2");
			expect(element.className).toBe("slider__tooltip");
			expect(element.style.display).toBe("block");
			expect(element.style.left).toBe("");
			expect(element.style.top).toBe(-1.6 + "rem");
		});

		test("renderTooltip vertical mask = false", () => {
			const tooltipMask: boolean = false;
			const vertical: boolean = true;
	
			tooltip.renderTooltip(
				tooltipMask,
				val,
				minVal,
				maxVal,
				vertical,
			);
			let element: HTMLElement = tooltip.getTooltip();
			expect(element.innerHTML).toBe("2");
			expect(element.className).toBe("slider__tooltip tooltip--vertical");
			expect(element.style.display).toBe("none");
			expect(element.style.left).toBe(-1.6 + "rem");
			expect(element.style.top).toBe("");
		});

	
	})

});
