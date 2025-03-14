// Тип передачи запроса
export interface OutlayRowRequest {
  id: number;
  equipmentCosts: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  parentId: number | null;
  rowName: string;
  salary: number;
  supportCosts: number;
}

export interface RowData extends OutlayRowRequest {
  level: number; // Уровень вложенности
  child: RowData[]; // Дочерние строки (только для внутреннего использования)
}
