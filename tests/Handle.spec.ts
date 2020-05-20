import Handle from "../src/MVP/View/Handle/Handle";

describe("Handle tests:", () => {
  let handle: Handle;

  beforeEach(() => {
    handle = new Handle(document.body, 0);
  });

  test("create handle element", () => {
    expect(handle.getHandle()).toBeInstanceOf(HTMLElement);
  });

  describe("renderHandle:", () => {
    const val: number = 2;
    const minVal: number = -3;
    const maxVal: number = 7;
    const sliderLength: number = 380;

    test("renderHandle horizontal", () => { 
      const vertical: boolean = false;
      handle.renderHandle(val, minVal, maxVal, vertical, sliderLength);
      let element: HTMLElement = handle.getHandle();
      
      expect(element.style.top).toBe("");
      expect(Object.is(element.style.left, "190px")).toBe(true)
    });

    test("renderHandle vertical", () => {  
      const vertical: boolean = true;
      handle.renderHandle(val, minVal, maxVal, vertical, sliderLength);
      let element: HTMLElement = handle.getHandle();

      expect(element.style.left).toBe("");
      expect(Object.is(element.style.top, "190px")).toBe(true)
    });

  
  })
});
