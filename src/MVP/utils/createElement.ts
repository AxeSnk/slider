function createElement(tag: string, props: { [key: string]: string }): HTMLElement {
  const element: HTMLElement = document.createElement(tag);

  Object.keys(props).forEach((key) => element.setAttribute(key, props[key]));

  return element;
}

export default createElement;
