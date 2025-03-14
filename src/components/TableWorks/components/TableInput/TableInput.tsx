import "./TableInput.style.scss";
import React from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: any) => void;
  isEditing: boolean;
  valueText: string | number;
  placeholder?: string;
  type?: "text" | "number";
}

export function TableInput({
  value,
  onChange,
  onKeyDown,
  isEditing,
  valueText,
  placeholder,
  type = "text",
}: InputProps) {
  const formatNumber = (value: string | number): string => {
    const numberValue = Number(
      value.toString().replace(/\s/g, "").replace(",", "."),
    );

    if (!isNaN(numberValue)) {
      return new Intl.NumberFormat("ru-RU", {
        minimumFractionDigits: numberValue % 1 === 0 ? 0 : 1,
      }).format(numberValue);
    }

    return value.toString(); // Если это текст, вернуть как есть
  };

  return (
    <td>
      {isEditing ? (
        <input
          className="table-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => onKeyDown(e.key)}
          placeholder={placeholder}
        />
      ) : (
        <span> {type === "text" ? valueText : formatNumber(valueText)}</span>
      )}
    </td>
  );
}
