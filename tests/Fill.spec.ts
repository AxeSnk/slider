import Fill from "../src/MVP/View/Fill/Fill";
import IOptions, { defaultOptions } from "../src/MVP/defaultOptions";

describe("Fill tests:", () => {
  let fill: Fill;
  const handleFirstPos = 100;
  const handleSecondPos = 300;
  const sliderPos = 0;
  const sliderLength = 400;
  let state: IOptions;

  beforeEach(() => {
    fill = new Fill(document.body)
  })

  test("create fill element", () => {
    expect(fill.getFill()).toBeInstanceOf(HTMLElement);
  });

  describe("renderFill", () => {
    const length: number = 27.500000000000004;

    test("renderFill vertical", () => {

      state = {...defaultOptions, ...{ range: false, vertical: true }};
      fill.renderFill(state, handleFirstPos, handleSecondPos, sliderPos, sliderLength);

      let element = fill.getFill();

      expect(element.className).toBe("slider__fill fill--vertical");
      expect(element.style.left).toBe("");
      expect(element.style.width).toBe("");
      expect(element.style.height).toBe(length + "%");
      expect(element.style.top).toBe("0px");
    });

    test("renderFill horizontal", () => {
      state = {...defaultOptions, ...{ range: false, vertical: false }}
      fill.renderFill(state, handleFirstPos, handleSecondPos, sliderPos, sliderLength);

      let element = fill.getFill();

      expect(element.className).toBe("slider__fill");
      expect(element.style.top).toBe("");
      expect(element.style.height).toBe("");
      expect(element.style.width).toBe(length + "%");
      expect(element.style.left).toBe("0px");
    });

  });

  describe("renderRangeFill", () => {
    const length: number = 50;
    const shift: number = 27.500000000000004;

    test("renderRangeFill vertical", () => {
      state = {...defaultOptions, ...{ range:true, vertical: true }}
      fill.renderFill(state, handleFirstPos, handleSecondPos, sliderPos, sliderLength);

      let element = fill.getFill();

      expect(element.className).toBe("slider__fill fill--vertical");
      expect(element.style.left).toBe("");
      expect(element.style.width).toBe("");
      expect(element.style.height).toBe(length + "%");
      expect(element.style.top).toBe(shift + "%");
    });


    test("renderRangeFill horizontal", () => {
      state = {...defaultOptions, ...{ range:true, vertical: false }}
      fill.renderFill(state, handleFirstPos, handleSecondPos, sliderPos, sliderLength);

      let element = fill.getFill();

      expect(element.className).toBe("slider__fill");
      expect(element.style.top).toBe("");
      expect(element.style.height).toBe("");
      expect(element.style.width).toBe(length + "%");
      expect(element.style.left).toBe(shift + "%");
    });
  });
});
