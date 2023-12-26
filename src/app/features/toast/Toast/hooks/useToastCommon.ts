import { VariantProps } from "class-variance-authority";
import { SwipeDirection } from "@radix-ui/react-toast";
import { useCallback } from "react";

import { toastsWrapperVariants } from "@/app/features/toast/Toast/ToastsWrapper/ToastsWrapper";

export const useToastCommon = () => {
  const checkSwipeDirection = useCallback(
    (
      vertical: VariantProps<typeof toastsWrapperVariants>["vertical"],
      horizontal: VariantProps<typeof toastsWrapperVariants>["horizontal"],
      swipe?: SwipeDirection,
    ): SwipeDirection => {
      if (swipe) {
        return swipe;
      } else if (horizontal === "left") {
        return "left";
      } else if (horizontal === "right") {
        return "right";
      } else if (vertical === "up") {
        return "up";
      } else {
        return "down";
      }
    },
    [],
  );

  return {
    checkSwipeDirection,
  };
};
