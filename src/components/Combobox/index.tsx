import React, { useState, useRef } from 'react';
import ListChips from './ListChips';
import ListItem from './ListItem';
import useOnClickOutside from './useOutsideClick';
import './style.scss';

type Props = Array<{ id: number | string, title: string }>


export default ({ defaultData, deleteditem }: { defaultData: Props, deleteditem: (id: string | number) => void }) => {
  const [data] = useState<Props>(defaultData);
  const [selecteditems, toggleSelecteditems] = useState<Props>([]);
  const [currentListItem, setCurrentListItem] = useState(0);
  const [value, onChange] = useState<string>('');
  const [isOpen, toggleOpen] = useState<boolean>(false);

  const ref = useRef(null);

  useOnClickOutside(ref, () => toggleOpen(false));

  const filterData = data.filter(item =>
    item.title.toLowerCase().includes(value.toLowerCase()) && !selecteditems.find((it: { id: string | number }) => it.id === item.id));

  const handleOptionKey = (event: any) => {
    let idx = 0;
    switch (event.key) {
      case 'ArrowUp':
        idx = currentListItem - 1 < 0 ? filterData.length - 1 : currentListItem - 1;
        setCurrentListItem(idx);
        break;
      case 'ArrowDown':
        idx = currentListItem + 1 > filterData.length - 1 ? 0 : currentListItem + 1;
        setCurrentListItem(idx);
        break;
      case 'Escape':
        toggleOpen(false);
        break;
      case 'Enter':
        if (filterData[currentListItem])
          toggleSelecteditems([...selecteditems, filterData[currentListItem]]);
        break;
    }
  };

  const onSelectItem = (id: string | number) => {
    const searchItem = data.find(item => item.id === id);
    if (searchItem) {
      toggleSelecteditems([...selecteditems, searchItem]);
      onChange('');
      toggleOpen(false);
    }
  }

  const onDeleteItem = (id: string | number) => {
    toggleSelecteditems(selecteditems.filter(item => item.id !== id));
    deleteditem(id);
  }

  return (
    <div
      // eslint-disable-next-line
      onKeyDown={handleOptionKey}
      role="presentation"
      tabIndex={0}
      ref={ref}
      className="combobox"
    >
      <ListChips onDeleteItem={onDeleteItem} data={selecteditems} />
      <input onFocus={() => toggleOpen(true)} value={value} onChange={(e) => onChange(e.target.value)} className="chip-input" />
      <button onClick={() => toggleOpen(true)} type="button" className="drop-down-button">&#8744;</button>
      {
        value || isOpen ?
          <ListItem
            currentListItem={currentListItem}
            onSelectItem={onSelectItem}
            data={filterData}
          /> : null
      }
    </div>
  );
}
