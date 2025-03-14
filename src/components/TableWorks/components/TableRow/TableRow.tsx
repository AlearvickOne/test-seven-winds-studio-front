import "./TableRow.style.scss";

import AddRowIcon from "@mui/icons-material/TextSnippet";
import DeleteRowIcon from "@mui/icons-material/DeleteForeverOutlined";
import { TableInput } from "../TableInput";
import { useEffect, useRef, useState } from "react";
import { RowData } from "../../TableWork.types";
import { tableWorksStore } from "../../TableWorks.store";

interface TableRowProps {
  row: RowData;
  level?: number;
  isLast: boolean;
  onSave: (updatedRow: RowData) => void;
}

const mouseEnterStyle = "table-icons_mouse-enter";
const mouseLeaveStyle = "table-icons_mouse-leave";

export function TableRow({ row, level = 0, isLast, onSave }: TableRowProps) {
  const iconsRef = useRef<HTMLDivElement>(null); // Ref для блока с иконками
  const [isHovered, setIsHovered] = useState(false); // Состояние для отслеживания наведения
  const [isEditing, setIsEditing] = useState(row?.id <= 0); // Режим редактирования для новых строк
  const [editedData, setEditedData] = useState<RowData>({ ...row }); // Состояние для хранения измененных данных

  // Обработчики событий
  const onMouseEnter = () => {
    if (isEditing || !iconsRef.current) return;

    iconsRef.current.classList.add(mouseEnterStyle);
    iconsRef.current.classList.remove(mouseLeaveStyle);
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    if (!iconsRef.current) return;

    iconsRef.current.classList.add(mouseLeaveStyle);
    iconsRef.current.classList.remove(mouseEnterStyle);
    setIsHovered(false);
  };

  const handleChange = (value: string, field: keyof RowData) => {
    const updatedData = { ...editedData, [field]: value };
    setEditedData(updatedData);
  };

  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      setIsEditing(false); // Выключаем режим редактирования
      onSave(editedData); // Сохранка
    }
  };

  useEffect(() => {
    onMouseLeave(); // Изначальное состояние иконок
  }, []);

  return (
    <>
      <tr onDoubleClick={() => setIsEditing(true)}>
        <td className="td-row" style={{ paddingLeft: `${level * 25}px` }}>
          <div className="div-row">
            {/* Вертикальная и горизонтальная линии */}
            {level > 0 && (
              <>
                <div
                  className="vertical-line"
                  style={{ height: isLast ? "185%" : "240%" }}
                />
                <div className="horizontal-line" />
              </>
            )}

            {/* Блок с иконками */}
            <div
              ref={iconsRef}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              {isEditing ? (
                <div>
                  <AddRowIcon className="disable-icon" />
                </div>
              ) : (
                <>
                  <AddRowIcon
                    className="add-row-icon"
                    onClick={() => tableWorksStore.addChildRow(row.id)}
                  />
                  {isHovered && (
                    <DeleteRowIcon
                      className="delete-row-icon"
                      onClick={() => tableWorksStore.deleteRowFromTable(row.id)}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </td>

        {/* Поля ввода или отображения данных */}
        <TableInput
          value={editedData.rowName}
          onChange={(v) => handleChange(v, "rowName")}
          onKeyDown={(key) => handleKeyDown(key)}
          isEditing={isEditing}
          valueText={editedData.rowName || ""}
          placeholder={"Статья работы № 2"}
        />
        <TableInput
          value={editedData.salary?.toString()}
          onChange={(v) => handleChange(v, "salary")}
          onKeyDown={(key) => handleKeyDown(key)}
          isEditing={isEditing}
          valueText={editedData.salary?.toString()}
          placeholder={"38200"}
          type={"number"}
        />
        <TableInput
          value={editedData.equipmentCosts?.toString()}
          onChange={(v) => handleChange(v, "equipmentCosts")}
          onKeyDown={(key) => handleKeyDown(key)}
          isEditing={isEditing}
          valueText={editedData.equipmentCosts?.toString()}
          placeholder={"1200"}
          type={"number"}
        />
        <TableInput
          value={editedData.overheads?.toString()}
          onChange={(v) => handleChange(v, "overheads")}
          onKeyDown={(key) => handleKeyDown(key)}
          isEditing={isEditing}
          valueText={editedData.overheads?.toString()}
          placeholder={"850"}
          type={"number"}
        />
        <TableInput
          value={editedData.estimatedProfit?.toString()}
          onChange={(v) => handleChange(v, "estimatedProfit")}
          onKeyDown={(key) => handleKeyDown(key)}
          isEditing={isEditing}
          valueText={editedData.estimatedProfit?.toString()}
          placeholder={"1020000"}
          type={"number"}
        />
      </tr>

      {/* Рекурсивный рендер дочерних строк */}
      {row.child?.map((child: RowData, index: number) => {
        return (
          <TableRow
            key={child.id}
            row={child}
            level={level + 1}
            isLast={index === row.child.length - 1}
            onSave={onSave}
          />
        );
      })}
    </>
  );
}
