import Fill from "../src/mvp/View/Fill/Fill";

describe("Fill tests:", () => {
  let fill: Fill = new Fill(document.body);

  it("create fill element", () => {
    expect(fill.getFill()).toBe("HTMLDivElement");
  });

  // it("Render fill", () => {
  //   let width: number = 80;
  //   fill.renderFill(width);
  //   let element: HTMLElement = document.querySelector(
  //     ".slider__fill"
  //   ) as HTMLElement;
  //   expect(element.style.width).to.equal(width + "px");
  // });
});
