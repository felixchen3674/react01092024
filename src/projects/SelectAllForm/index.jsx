import React, { useState } from "react";

export default function SelectAllForm() {
  const [items, setItems] = useState([
    { id: 1, name: "item1", checked: false },
    { id: 2, name: "item2", checked: false },
    { id: 3, name: "item3", checked: false },
  ]);

  const isAllChecked = items.every((item) => item.checked);
  const handleSelectAll = () => {
    const newItems = items.map((item) => {
      return {
        ...item,
        checked: !isAllChecked,
      };
    });
    setItems(newItems);
  };

  const handleCheckItem = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <div>
      <div>
        <h3 style={{ marginBottom: 10 }}>All the selected Items:</h3>
        {/* <div>
          {items.map((item) => {
            const { id, name, checked } = item;
            return <span key={id}>{checked && name}</span>;
          })}
        </div> */}
        <span>
          {items
            .filter((item) => item.checked)
            .map((item) => item.name)
            .join(", ")}
        </span>
      </div>
      <CheckboxItem
        type="checkbox"
        name="SelectAll"
        checked={isAllChecked}
        onChange={handleSelectAll}
      />
      {items.map((item) => {
        const { id, name, checked } = item;
        return (
          <CheckboxItem
            key={id}
            name={name}
            checked={checked}
            onChange={handleCheckItem.bind(null, id)}
          />
        );
      })}
    </div>
  );
}

function CheckboxItem({ name, checked, onChange }) {
  return (
    <div>
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span>{name}</span>
      </label>
    </div>
  );
}
