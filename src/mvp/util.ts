export default function createElement(tag: string, props: { [key: string]: string }): HTMLElement {
    const element = document.createElement(tag);

    Object.keys(props).forEach(key => element[key] = props[key]);

    return element;
}
