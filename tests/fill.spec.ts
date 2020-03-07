import Fill from "../src/mvp/View/Fill/Fill";
import IOptions, { defaultOptions } from "../src/mvp/defaultOptions";

describe("Fill tests:", () => {
  let fill: Fill;
  const length: number = 200;
  let state: IOptions;

  beforeEach(() => {
    fill = new Fill(document.body)
  })

  test("create fill element", () => {
    expect(fill.getFill()).toBeInstanceOf(HTMLElement);
  });

  describe("renderFill", () => {

    test("renderFill vertical", () => {
      state = {...defaultOptions, ...{ range: false, vertical: true }};
      fill.renderFill(state, length);

      let element = fill.getFill();

      expect(element.className).toBe("slider__fill fill--vertical");
      expect(element.style.left).toBe("");
      expect(element.style.width).toBe("");
      expect(element.style.height).toBe(length + "px");
      expect(element.style.top).toBe("0px");
    });

    test("renderFill horizontal", () => {
      state = {...defaultOptions, ...{ range: false, vertical: false }}
      fill.renderFill(state, length);

      let element = fill.getFill();

      expect(element.className).toBe("slider__fill");
      expect(element.style.top).toBe("");
      expect(element.style.height).toBe("");
      expect(element.style.width).toBe(length + "px");
      expect(element.style.left).toBe("0px");
    });

  });

  describe("renderRangeFill", () => {
    const posHandle_0: number = 1;
    const posHandle_1: number = 2;
    const shift: number = 100;

    test("renderRangeFill vertical", () => {
      state = {...defaultOptions, ...{ vertical: true }}
      fill.renderRangeFill(state, posHandle_0, posHandle_1, shift, length);

      let element = fill.getFill();

      expect(element.className).toBe("slider__fill fill--vertical");
      expect(element.style.left).toBe("");
      expect(element.style.width).toBe("");
      expect(element.style.height).toBe(length + "px");
      expect(element.style.top).toBe(shift + "px");
    });


    test("renderRangeFill horizontal", () => {
      state = {...defaultOptions, ...{ vertical: false }}
      fill.renderRangeFill(state, posHandle_0, posHandle_1, shift, length);

      let element = fill.getFill();

      expect(element.className).toBe("slider__fill");
      expect(element.style.top).toBe("");
      expect(element.style.height).toBe("");
      expect(element.style.width).toBe(length + "px");
      expect(element.style.left).toBe(shift + "px");
    });
  });
});
