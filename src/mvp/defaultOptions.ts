export default interface IOptions {
  width: number; // ширина слайдера
  val: any; // первоначальное положение одиночного ползунка
  minVal: any; // минимальное значение диапазона, при слайдере с диапазоном
  maxVal: any; // максимальное значение диапазона, при слайдере с диапазоном
  step: number; // шаг ползунка
  range: boolean; // диапазон слайдера
  tooltip: boolean; // подсказка над ползунком
  vertical: boolean; // вертикальный слайдер
}

var defaultOptions: IOptions = {
  width: 300,
  val: 8,
  minVal: 0,
  maxVal: 280,
  step: 20,
  range: false,
  tooltip: true,
  vertical: false,
}

export { defaultOptions };