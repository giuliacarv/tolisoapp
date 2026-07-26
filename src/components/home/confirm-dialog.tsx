import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { buttonOutline, buttonSolid, sheetDialogContent } from "./primitives";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: ReactNode;
  /** Bloco de resumo opcional (produto, cupom, etc.). */
  summary?: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
}

/**
 * Confirmação genérica em formato bottom-sheet no mobile e diálogo centrado no
 * desktop. Acessibilidade (Escape, foco preso, bloqueio de rolagem) vem do Radix.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  summary,
  confirmLabel,
  cancelLabel = "Cancelar",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={sheetDialogContent}>
        <DialogHeader>
          <DialogTitle className="font-serif text-fluid-h3 tracking-tight text-foreground">
            {title}
          </DialogTitle>
          <DialogDescription className="pt-1 text-fluid-sm leading-relaxed text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        {summary}

        <DialogFooter className="gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(buttonOutline, "w-full sm:w-auto")}
          >
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm} className={cn(buttonSolid, "w-full sm:w-auto")}>
            {confirmLabel}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
