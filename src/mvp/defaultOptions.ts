export default interface IOptions {
  val: number; // первоначальное положение одиночного ползунка
  valStart: number; // положение начального ползунка (range = true)
  valEnd: number; // положение конечного ползунка (range = true)
  minVal: number; // минимальное значение диапазона, при слайдере с диапазоном
  maxVal: number; // максимальное значение диапазона, при слайдере с диапазоном
  step: number; // шаг ползунка
  range: boolean; // диапазон слайдера
  tooltip: boolean; // подсказка над ползунком
  vertical: boolean; // вертикальный слайдер
  scale: boolean; // шкала
}

var defaultOptions: IOptions = {
  val: 3,
  valStart: -1,
  valEnd: 3,
  minVal: -3,
  maxVal: 10,
  step: 2,
  range: true,
  tooltip: true,
  vertical: false,
  scale: true
};

export { defaultOptions };
