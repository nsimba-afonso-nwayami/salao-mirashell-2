import React, { useEffect, useState } from "react";

export default function Modal({ isOpen, onClose, title, icon, children }) {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setShow(true);
    else {
      const timer = setTimeout(() => setShow(false), 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-700 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-stone-50 w-full h-full relative transform transition-all duration-700 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        {/* CABEÇALHO */}
        <div className="flex items-center gap-4 p-6 border-b border-stone-200 sticky top-0 bg-stone-50 z-10">
          {icon && (
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-[#A2672D] text-gray-200 text-xl shadow-sm">
              <i className={icon}></i>
            </div>
          )}

          <h2 className="text-2xl font-bold text-stone-800">{title}</h2>

          <button
            onClick={onClose}
            className="ml-auto cursor-pointer text-stone-500 hover:text-[#A2672D] text-3xl font-bold transition-colors"
            title="Fechar"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* CONTEÚDO */}
        <div className="overflow-y-auto h-[calc(100%-88px)] px-6 py-8">
          {children}
          <div className="h-10"></div>
        </div>
      </div>
    </div>
  );
}
