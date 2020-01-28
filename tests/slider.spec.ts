import "mocha";
import { expect } from "chai";
import Slider from "../src/mvp/view/slider/slider";

const { JSDOM } = require("jsdom");

describe("Slider tests", () => {
  let dom: any = JSDOM.fragment("<div></div>");
  let slider: Slider = new Slider(dom);

  it("Create slider element", () => {
    expect(slider.getElement()).to.be.a("HTMLDivElement");
  });

  // it('Get position slider', () => {
  // 	expect(slider.getPosition()).to.equal('50px');
  // });
});
