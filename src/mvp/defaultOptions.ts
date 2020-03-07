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
}

const defaultOptions: IOptions = {
  val: 4,
  valStart: 4,
  valEnd: 8,
  minVal: 0,
  maxVal: 10,
  step: 1,
  range: true,
  tooltip: true,
  vertical: false
};

export { defaultOptions };
