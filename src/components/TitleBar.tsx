import { useState, useEffect } from 'react';
import { Minus, Square, X, Copy } from 'lucide-react';

export const TitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [appWindow, setAppWindow] = useState<any>(null);

  useEffect(() => {
    // Only run this in the browser if we know we're in Tauri
    const isTauriContext = typeof window !== 'undefined' && (window as any).__TAURI_INTERNALS__;
    
    if (isTauriContext) {
      import('@tauri-apps/api/window').then(({ getCurrentWindow }) => {
        const win = getCurrentWindow();
        setAppWindow(win);
        
        win.isMaximized().then(setIsMaximized);

        win.onResized(() => {
          win.isMaximized().then(setIsMaximized);
        });
      }).catch(console.error);
    }
  }, []);

  const handleMinimize = () => appWindow?.minimize().catch(console.error);
  const handleMaximize = () => {
    if (appWindow) {
      appWindow.toggleMaximize().then(() => {
        appWindow.isMaximized().then(setIsMaximized);
      }).catch(console.error);
    }
  };
  const handleClose = () => appWindow?.close().catch(console.error);

  return (
    <div 
      data-tauri-drag-region 
      className="h-10 bg-[#001b4d] flex items-center justify-between select-none fixed top-0 left-0 right-0 z-9999 cursor-default"
    >
      <div className="flex items-center px-4 gap-2 pointer-events-none">
        <div className="w-5 h-5 bg-orange-500 rounded-md flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">N</span>
        </div>
        <span className="text-white text-xs font-semibold tracking-wider">NAMASTE PMS</span>
      </div>

      <div className="flex h-full">
        <button
          onClick={handleMinimize}
          disabled={!appWindow}
          className="px-4 flex items-center justify-center hover:bg-white/10 transition-colors text-white/70 hover:text-white disabled:opacity-30"
          title="Minimize"
        >
          <Minus size={14} />
        </button>
        <button
          onClick={handleMaximize}
          disabled={!appWindow}
          className="px-4 flex items-center justify-center hover:bg-white/10 transition-colors text-white/70 hover:text-white disabled:opacity-30"
          title={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? <Copy size={12} /> : <Square size={12} />}
        </button>
        <button
          onClick={handleClose}
          disabled={!appWindow}
          className="px-4 flex items-center justify-center hover:bg-red-500 transition-colors text-white/70 hover:text-white disabled:opacity-30"
          title="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
