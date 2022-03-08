/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-cycle */
import { Armor } from '../ArmorList';

interface Piece {
  item: Armor | null;
  onMenu: () => void;
}

export default function ArmorPiece({ item, onMenu }: Piece) {
  return (
    <div className="armor-piece" onClick={() => onMenu(true)}>
      <div className="armor-icon" />
      <div className="armor-content">
        <span>{item?.name || 'None'}</span>
      </div>
    </div>
  );
}
