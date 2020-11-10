interface IOptions {
  val: number; // положение одиночного ползунка
  valEnd: number; // положение конечного ползунка, при слайдере с диапазоном
  minVal: number; // минимальное значение слайдера
  maxVal: number; // максимальное значение слайдера
  step: number; // шаг ползунка
  range: boolean; // вкл/выкл диапазон слайдера
  tooltip: boolean; // вкл/выкл подсказку над ползунком
  vertical: boolean; // вкл/выкл вертикальный слайдер
  scale: boolean; // шкала значений
}

export type { IOptions };
