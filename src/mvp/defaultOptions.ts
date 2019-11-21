export default interface IOptions {
  width: string;
  val: any;
  minVal: any;
  maxVal: any;
  tooltip: any;
}

var defaultOptions: IOptions = {
  width: '400px',
  val: 200,
  minVal: null,
  maxVal: null,
  tooltip: false,
}

export { defaultOptions };