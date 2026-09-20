"use client";

import { useEffect } from "react";

/**
 * Escuta selectionchange e sorteia accent ou secondary como cor do highlight.
 * Aplica `data-sel` em <html>; CSS lê o atributo.
 * Não renderiza nada no DOM.
 */
export function SelectionRandomizer() {
  useEffect(() => {
    function onSelectionChange() {
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed) {
        const pick = Math.random() < 0.5 ? "accent" : "secondary";
        document.documentElement.dataset.sel = pick;
      }
    }

    document.addEventListener("selectionchange", onSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", onSelectionChange);
  }, []);

  return null;
}
