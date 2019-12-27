export default interface IOptions {
  val: number; // первоначальное положение одиночного ползунка
  minVal: number; // минимальное значение диапазона, при слайдере с диапазоном
  maxVal: number; // максимальное значение диапазона, при слайдере с диапазоном
  step: number; // шаг ползунка
  range: boolean; // диапазон слайдера
  tooltip: boolean; // подсказка над ползунком
  vertical: boolean; // вертикальный слайдер
  scale: boolean; // шкала
}

var defaultOptions: IOptions = {
  val: 0,
  minVal: -8,
  maxVal: 0,
  step: 1,
  range: false,
  tooltip: true,
  vertical: false,
  scale: true
}

export { defaultOptions };