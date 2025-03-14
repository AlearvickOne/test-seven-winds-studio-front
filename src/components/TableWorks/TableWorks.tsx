import "./TableWorks.style.scss";
import { observer } from "mobx-react-lite";
import { tableWorksStore } from "./TableWorks.store";
import { TableRow } from "./components";
import { useEffect } from "react";

export const TableWorks = observer(() => {
  useEffect(() => {
    tableWorksStore.loadData().then();
  }, []);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Уровень</th>
            <th>Наименование работ</th>
            <th>Основная з/п</th>
            <th>Оборудование</th>
            <th>Накладные расходы</th>
            <th>Сметная прибыль</th>
          </tr>
        </thead>
        <tbody>
          {tableWorksStore.treeData.map((row, index) => (
            <TableRow
              key={row.id}
              row={row}
              level={row.level}
              isLast={index === tableWorksStore.treeData.length - 1}
              onSave={async (updatedRow) => {
                if (updatedRow.parentId === null) {
                  tableWorksStore.updateRow(updatedRow, index);
                } else {
                  tableWorksStore.updateChildRow(
                    updatedRow.parentId,
                    updatedRow,
                  );
                }
                await tableWorksStore.sendRowToBackend(updatedRow);
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});
