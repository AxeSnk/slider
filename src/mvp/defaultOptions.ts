export default interface IOptions {
  width: string; // ширина слайдера
  val: any; // первоначальное положение одиночного ползунка
  minVal: any; // минимальное значение диапазона, при слайдере с диапазоном
  maxVal: any; // максимальное значение диапазона, при слайдере с диапазоном
  step: any; // шаг ползунка
  range: boolean; // диапазон слайдера
  tooltip: boolean; // подсказка над ползунком
  vertical: boolean; // вертикальный слайдер
}

var defaultOptions: IOptions = {
  width: '300px',
  val: 8,
  minVal: null,
  maxVal: null,
  step: null,
  range: false,
  tooltip: true,
  vertical: false,
}

export { defaultOptions };