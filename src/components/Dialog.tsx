"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
  type RefObject,
  type SyntheticEvent,
} from "react";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

type DialogContextValue = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  open: () => void;
  close: () => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog parts must be used within Dialog");
  }
  return context;
}

type DialogProps = {
  children: ReactNode;
};

export function Dialog({ children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => {
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const value = useMemo(
    () => ({ dialogRef, open, close }),
    [dialogRef, open, close],
  );

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}

type DialogTriggerProps = Omit<ComponentProps<"button">, "type">;

export function DialogTrigger({
  className,
  onClick,
  ...props
}: DialogTriggerProps) {
  const { open } = useDialog();

  return (
    <button
      type="button"
      className={className}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          open();
        }
      }}
    />
  );
}

type DialogContentProps = ComponentProps<"dialog">;

export function DialogContent({
  className,
  onClick,
  onClose,
  children,
  ...props
}: DialogContentProps) {
  const { dialogRef, close } = useDialog();

  function handleClick(event: MouseEvent<HTMLDialogElement>) {
    onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }
    const isBackdrop = event.target === event.currentTarget;
    if (isBackdrop) {
      close();
    }
  }

  function handleClose(event: SyntheticEvent<HTMLDialogElement>) {
    document.documentElement.style.overflow = "";
    onClose?.(event);
  }

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "backdrop:bg-brand/80 m-auto max-h-[min(92vh,100%)] w-[min(92vw,72rem)] max-w-none border-0 bg-transparent p-4 backdrop:backdrop-blur-md open:flex open:flex-col open:items-center",
        className,
      )}
      {...props}
      tabIndex={-1}
      onClick={handleClick}
      onClose={handleClose}
    >
      <div className="relative w-full">{children}</div>
    </dialog>
  );
}

type DialogCloseProps = Omit<ComponentProps<"button">, "type" | "children">;

export function DialogClose({
  className,
  onClick,
  autoFocus = true,
  "aria-label": ariaLabel = "Close",
  ...props
}: DialogCloseProps) {
  const { close } = useDialog();

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(
        "bg-brand-foreground text-brand absolute top-3 right-3 z-10 inline-flex size-10 cursor-pointer items-center justify-center rounded-lg motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-105",
        className,
      )}
      {...props}
      autoFocus={autoFocus}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          close();
        }
      }}
    >
      <Icon name="close" size="md" aria-hidden />
    </button>
  );
}
