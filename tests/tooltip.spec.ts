import "mocha";
import { expect } from "chai";
import Tooltip from "../src/mvp/View/tooltip/tooltip";

describe("Tooltip tests", () => {
  let tooltip: Tooltip = new Tooltip(document.body);

  it("Create tooltip element", () => {
    expect(tooltip.getTooltip()).to.be.a("HTMLDivElement");
  });

  it("Render tooltip", () => {
    let val: number = 2;
    let minVal: number = -3;
    let maxVal: number = 5;
    let handleHeight: number = 20;

    tooltip.renderTooltip(val, minVal, maxVal, handleHeight);
    let element: HTMLElement = document.querySelector(
      ".slider__tooltip"
    ) as HTMLElement;
    expect(element.innerHTML).to.equal("2");

    // Тест не проходит!!???
  });
});
