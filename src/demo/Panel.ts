class Panel {
  root: HTMLElement;
  $slider: JQuery<Element>;

  constructor(root: HTMLElement, $slider: JQuery<Element>) {
    this.root = root;
    this.$slider = $slider;
  }
}

export default Panel;
