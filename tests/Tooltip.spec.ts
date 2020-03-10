import Tooltip from "../src/mvp/View/Tooltip/Tooltip";

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
		const handleHeight: number = 20;

		test("renderTooltip horizontal mask = true", () => {
			const tooltipMask: boolean = true;
			const vertical: boolean = false;
	
			tooltip.renderTooltip(
				tooltipMask,
				val,
				minVal,
				maxVal,
				vertical,
				handleHeight
			);
			let element: HTMLElement = tooltip.getTooltip();
			expect(element.innerHTML).toBe("2");
			expect(element.className).toBe("slider__tooltip");
			expect(element.style.display).toBe("block");
			expect(element.style.left).toBe("");
			expect(element.style.top).toBe(-handleHeight * 1.4 + "px");
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
				handleHeight
			);
			let element: HTMLElement = tooltip.getTooltip();
			expect(element.innerHTML).toBe("2");
			expect(element.className).toBe("slider__tooltip tooltip--vertical");
			expect(element.style.display).toBe("none");
			expect(element.style.left).toBe(-handleHeight * 1.4 + "px");
			expect(element.style.top).toBe("");
		});

	
	})

});
