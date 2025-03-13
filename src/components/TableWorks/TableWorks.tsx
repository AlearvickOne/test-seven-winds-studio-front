import "./TableWorks.style.scss";
import { useState } from "react";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

// Данные для дерева (с неограниченными вложенностями)
const treeData = [
  {
    id: 1,
    name: "Категория 1",
    price: "100 ₽",
    children: [
      {
        id: 2,
        name: "Подкатегория 1.1",
        price: "50 ₽",
        children: [
          {
            id: 3,
            name: "Товар 1.1.1",
            price: "30 ₽",
          },
          {
            id: 4,
            name: "Товар 1.1.2",
            price: "20 ₽",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Категория 2",
    price: "200 ₽",
    children: [
      {
        id: 7,
        name: "Товар 2.1",
        price: "150 ₽",
      },
    ],
  },
];

export function TableWorks() {
  return (
    <div className="background-table">
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
          {treeData.map((row, index) => (
            <TableRow
              key={row.id}
              row={row}
              isLast={index === treeData.length - 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ row, level = 0, isLast }) {
  const hasChildren = row.children?.length > 0;

  return (
    <>
      <tr>
        <td
          style={{
            paddingLeft: `${level * 20}px`,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Вертикальная линия (ниточка) */}
            {level > 0 && (
              <div
                style={{
                  position: "absolute",
                  left: "-10px",
                  top: "0",
                  height: "100%",
                  width: "1px",
                  backgroundColor: "#ccc",
                }}
              />
            )}

            {/* Горизонтальная линия (ниточка) */}
            {level > 0 && (
              <div
                style={{
                  position: "absolute",
                  left: "-10px",
                  top: "50%",
                  width: "10px",
                  height: "1px",
                  backgroundColor: "#ccc",
                }}
              />
            )}

            {/* Иконки */}
            <TextSnippetIcon />
          </div>
        </td>
        <td>{row.price}</td>
      </tr>

      {hasChildren &&
        row.children?.map((child, index) => (
          <TableRow
            key={child.id}
            row={child}
            level={level + 1}
            isLast={index === row.children?.length - 1}
          />
        ))}
    </>
  );
}
