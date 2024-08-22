"use client";

import { LegacyRef, MutableRefObject, ReactNode, useCallback, useEffect } from "react";

import { ElementRefs } from "@/app/[lng]/features/test-case/libs";

interface Props {
  index: number;
  cacheKey: keyof ElementRefs;
  children: (ref: LegacyRef<HTMLDivElement> | undefined) => ReactNode;
  elementRefs: MutableRefObject<ElementRefs>;
}

export function CellCalculate(props: Props) {
  const { cacheKey, index, children, elementRefs } = props;

  const createRef = useCallback(
    (key: keyof ElementRefs) => {
      return (el: HTMLDivElement | null) => {
        elementRefs.current[key].els[index] = { ref: el, width: 0 };
      };
    },
    [elementRefs, index],
  );

  useEffect(() => {
    if (elementRefs.current[cacheKey].els[index].ref) {
      const maxWidth = elementRefs.current[cacheKey].width;
      const width = elementRefs.current[cacheKey].els[index].ref.style.width;

      elementRefs.current[cacheKey].els[index].ref.style.width = "auto";
      elementRefs.current[cacheKey].els[index].ref.style.position = "absolute";

      const firstWidth = elementRefs.current[cacheKey].els[index].ref.offsetWidth ?? 0;

      elementRefs.current[cacheKey].els[index].ref.style.width = width;
      elementRefs.current[cacheKey].els[index].ref.style.position = "";

      elementRefs.current[cacheKey].els[index].width = firstWidth;

      elementRefs.current[cacheKey].width = Math.max(maxWidth, firstWidth);

      if (maxWidth !== elementRefs.current[cacheKey].width) {
        elementRefs.current[cacheKey].els.forEach((el) => {
          if (el.ref) {
            el.ref.style.width = `${elementRefs.current[cacheKey].width}px`;
          }
        });
      }
    }
  }, [elementRefs, index, cacheKey]);

  return children(createRef(cacheKey));
}
