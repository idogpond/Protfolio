"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface ConfirmState {
  message: string;
}

export function useConfirm() {
  const [state, setState] = useState<ConfirmState | null>(null);
  const resolver = useRef<(value: boolean) => void>();

  const confirm = useCallback((message: string) => {
    setState({ message });
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  function settle(result: boolean) {
    setState(null);
    resolver.current?.(result);
  }

  const dialog = state ? (
    <ConfirmDialog
      message={state.message}
      onCancel={() => settle(false)}
      onConfirm={() => settle(true)}
    />
  ) : null;

  return { confirm, dialog };
}

function ConfirmDialog({
  message,
  onCancel,
  onConfirm,
}: {
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const t = useTranslations("admin.form");

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-describedby="confirm-dialog-message"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative card w-full max-w-sm p-6">
        <p id="confirm-dialog-message" className="text-foreground text-sm leading-relaxed">
          {message}
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" size="sm" onClick={onCancel}>
            {t("cancel")}
          </Button>
          <Button variant="destructive" size="sm" autoFocus onClick={onConfirm}>
            {t("delete")}
          </Button>
        </div>
      </div>
    </div>
  );
}
