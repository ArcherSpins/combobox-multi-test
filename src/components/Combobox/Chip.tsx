import React from 'react';

type Props = {
  id: number | string,
  title: string,
  onDeleteItem: (id: string | number) => void
}

export default ({ id, title, onDeleteItem }: Props) => (
  <div className="chip">
    {title}
    <button onClick={() => onDeleteItem(id)} type="button" className="delete-chips-button">&#10005;</button>
  </div>
);
