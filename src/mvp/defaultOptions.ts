export default interface IOptions {
  width: string;
  minVal: any;
  maxVal: any;
  tooltip: any;
}

var defaultOptions: IOptions = {
  width: '400px',
  minVal: null,
  maxVal: 100,
  tooltip: false,
}

export { defaultOptions };