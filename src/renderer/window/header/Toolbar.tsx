export default function Toolbar() {
  return (
    <div className="window-header-buttons">
      <button
        role="menuitem"
        type="button"
        onClick={() => window.electron.ipcRenderer.minimize()}
      >
        -
      </button>
      <button
        role="menuitem"
        type="button"
        onClick={() => window.electron.ipcRenderer.maximize()}
      >
        口
      </button>
      <button
        role="menuitem"
        type="button"
        onClick={() => window.electron.ipcRenderer.close()}
      >
        X
      </button>
    </div>
  );
}
