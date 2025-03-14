import { makeAutoObservable, runInAction } from "mobx";
import {
  createTableRowBackend,
  getRowListFromBackend,
  updateTableRowBackend,
  deleteRowFromBackend,
} from "./TableWorks.service";
import { RowData } from "./TableWork.types";

class TableWorksStore {
  treeData: RowData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Загрузка данных с сервера
  async loadData() {
    // Загружаем данные с сервера
    this.treeData = await getRowListFromBackend();

    // Если данных нет, добавляем одну новую строку
    if (this.treeData.length === 0) {
      this.treeData = [this.createNewRow(0)];
    }
  }

  // Создание новой строки
  createNewRow(level: number, parentId: number | null = null): RowData {
    return {
      id: Math.random() * -1,
      level: level,
      equipmentCosts: 0,
      estimatedProfit: 0,
      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      overheads: 0,
      parentId: parentId,
      rowName: "",
      salary: 0,
      supportCosts: 0,
      child: [],
    };
  }

  // Обновление строки
  updateRow(updatedRow: RowData, index: number) {
    const newData = [...this.treeData];
    newData[index] = updatedRow;
    this.treeData = newData;
  }

  // Обновление дочерней строки
  updateChildRow(parentId: number, updatedChild: RowData) {
    const updateTree = (data: RowData[]): RowData[] => {
      return data.map((item) => {
        if (item.id === parentId) {
          // Обновляем дочерний элемент
          return {
            ...item,
            child: item.child.map((child) =>
              child.id === updatedChild.id ? updatedChild : child,
            ),
          };
        }
        // Рекурсивно обновляем детей
        return { ...item, child: updateTree(item.child) };
      });
    };

    this.treeData = updateTree(this.treeData);
  }

  // Добавление дочерней строки
  addChildRow(parentId: number) {
    const updateTree = (data: RowData[]): RowData[] => {
      return data.map((item) => {
        if (item.id === parentId) {
          // Добавляем нового ребёнка
          const newChild = this.createNewRow(item.level + 1, parentId);
          return { ...item, child: [...item.child, newChild] };
        }
        // Рекурсивно обновляем детей
        return { ...item, child: updateTree(item.child) };
      });
    };

    this.treeData = updateTree(this.treeData);
  }

  // Отправка данных на сервер
  async sendRowToBackend(row: RowData) {
    const { id, level, child, ...rest } = row;

    if (row.id <= 0) {
      // Создаём новую строку на сервере
      const res = await createTableRowBackend(rest);

      // Находим строку в treeData и обновляем её id
      const updateRowId = (data: RowData[]): RowData[] => {
        return data.map((item) => {
          if (item.id === row.id) {
            // Нашли строку, обновляем её id
            return { ...item, id: res.id };
          }
          // Рекурсивно обновляем детей
          return { ...item, child: updateRowId(item.child) };
        });
      };

      // Обновляем treeData
      runInAction(() => {
        this.treeData = updateRowId(this.treeData);
      });
    } else {
      // Обновляем существующую строку на сервере
      await updateTableRowBackend(row.id, rest);
    }
  }

  // Удаление строки по rowId
  async deleteRowFromTable(id: number) {
    const removeRow = (data: RowData[]): RowData[] => {
      return data
        .filter((item) => item.id !== id) // Удаляем строку с указанным id
        .map((item) => ({
          ...item,
          child: removeRow(item.child), // Рекурсивно удаляем из дочерних элементов
        }));
    };

    this.treeData = removeRow(this.treeData);
    await deleteRowFromBackend(id);
  }
}

export const tableWorksStore = new TableWorksStore();
