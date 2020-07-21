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

    test("renderHandle horizontal", () => { 
      const vertical: boolean = false;
      handle.renderHandle(val, minVal, maxVal, vertical);
      let element: HTMLElement = handle.getHandle();
      
      expect(element.style.top).toBe("");
      expect(element.style.left).toBe("48%")
    });

    test("renderHandle vertical", () => {  
      const vertical: boolean = true;
      handle.renderHandle(val, minVal, maxVal, vertical);
      let element: HTMLElement = handle.getHandle();

      expect(element.style.left).toBe("");
      expect(element.style.top).toBe("48%")
    });

  
  })
});
