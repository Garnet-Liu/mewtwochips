"use client";

import { Button, Dialog, DropdownMenu } from "@radix-ui/themes";
import { forwardRef, ReactNode, useRef, useState } from "react";

import { cn } from "@/context/cn";

export function DropdownWithDialogCase() {
  const rootRef = useRef<HTMLDivElement>(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasOpenDialog, setHasOpenDialog] = useState(false);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);

  function handleDialogItemOpenChange(open: boolean) {
    setHasOpenDialog(open);
    if (open) {
    } else if (!open) {
      console.log("handleDialogItemOpenChange", open);
      setDropdownOpen(false);
    }
  }

  console.log("state", { dropdownOpen, hasOpenDialog });

  return (
    <div ref={rootRef}>
      <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenu.Trigger>
          <Button ref={dropdownTriggerRef}>Actions</Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          onAnimationEnd={(e) => {
            console.log(`End: ${e.animationName}`);
          }}
          onAnimationEndCapture={(e) => {
            console.log(`EndCapture: ${e.animationName}`);
            if (e.animationName === "rt-slide-to-bottom") {
              console.log("===========================");
              setHasOpenDialog(false);
            }
          }}
          className={cn(hasOpenDialog ? "!hidden" : "")}
          onCloseAutoFocus={(event) => {
            // if (focusRef.current) {
            //   focusRef.current.focus();
            //   focusRef.current = null;
            //   event.preventDefault();
            // }
          }}
        >
          <DropdownMenu.Group>
            <DropdownMenu.Label>Regular items</DropdownMenu.Label>
            <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
            <DropdownMenu.Item>Copy</DropdownMenu.Item>

            <DialogItem
              triggerChildren="Edit111"
              setHasOpenDialog={setHasOpenDialog}
              onOpenChange={handleDialogItemOpenChange}
            >
              asasasasas
            </DialogItem>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}

type DialogItem = {
  children: ReactNode;
  triggerChildren: ReactNode;
  onOpenChange: (o: boolean) => void;
  setHasOpenDialog: (o: boolean) => void;
};

const DialogItem = forwardRef<HTMLDivElement, DialogItem>(
  function DialogItemRef(props, forwardedRef) {
    const { triggerChildren, children, onOpenChange, setHasOpenDialog, ...itemProps } = props;
    return (
      <Dialog.Root onOpenChange={onOpenChange}>
        <Dialog.Trigger>
          <DropdownMenu.Item
            {...itemProps}
            ref={forwardedRef}
            onSelect={(event) => {
              event.preventDefault();
            }}
          >
            {triggerChildren}
          </DropdownMenu.Item>
        </Dialog.Trigger>

        <Dialog.Content>
          {children}

          <Dialog.Close>
            <button aria-label="Close">Close</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    );
  },
);
