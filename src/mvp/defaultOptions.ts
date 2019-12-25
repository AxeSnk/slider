export default interface IOptions {
  val: any; // первоначальное положение одиночного ползунка
  minVal: any; // минимальное значение диапазона, при слайдере с диапазоном
  maxVal: any; // максимальное значение диапазона, при слайдере с диапазоном
  step: number; // шаг ползунка
  range: boolean; // диапазон слайдера
  tooltip: boolean; // подсказка над ползунком
  vertical: boolean; // вертикальный слайдер
  scale: boolean; // шкала
}

var defaultOptions: IOptions = {
  val: -2,
  minVal: -4,
  maxVal: 2,
  step: 1,
  range: false,
  tooltip: true,
  vertical: false,
  scale: true
}

export { defaultOptions };