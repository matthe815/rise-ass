import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import {
  faWindowMinimize,
  faWindowMaximize,
} from '@fortawesome/free-regular-svg-icons';

export default function Toolbar() {
  return (
    <div className="window-header-buttons">
      <button
        role="menuitem"
        type="button"
        onClick={() => window.electron.ipcRenderer.minimize()}
      >
        <FontAwesomeIcon icon={faWindowMinimize} />
      </button>
      <button
        role="menuitem"
        type="button"
        onClick={() => window.electron.ipcRenderer.maximize()}
      >
        <FontAwesomeIcon icon={faWindowMaximize} />
      </button>
      <button
        role="menuitem"
        type="button"
        onClick={() => window.electron.ipcRenderer.close()}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}
