"use client";

import { Button, Flex, TextField } from "@radix-ui/themes";
import { ChangeEvent, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { BaseLoading } from "@/components";
import { VillageError, VillageInfo } from "@/app/[lng]/search/libs";
import { ILanguage } from "@/types/globals";

interface Props extends ILanguage {}

interface State {
  tag: string;
  search: string;
}

export function SearchVillage(props: Props) {
  const { lng } = props;
  const [state, setState] = useState<State>({
    tag: "QU990YJUR",
    search: "",
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setState((s) => {
      return { ...s, tag: e.target.value.replace("#", "") };
    });
  };

  const handleFetchData = async () => {
    setState((s) => {
      return { ...s, search: s.tag };
    });
  };

  const handleReset = () => {
    setState((s) => {
      return { ...s, search: "" };
    });
  };
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Flex className="col-span-1" gap="8" direction="column">
        <TextField.Root variant="soft" size="3">
          <TextField.Slot>#</TextField.Slot>

          <TextField.Root value={state.tag} onChange={handleInput} placeholder="QU990YJUR" />
        </TextField.Root>

        <Button size="3" onClick={handleFetchData}>
          搜索你的村庄
        </Button>
      </Flex>

      <ErrorBoundary fallbackRender={VillageError} resetKeys={[state.tag]} onReset={handleReset}>
        <Suspense fallback={<BaseLoading />}>
          <VillageInfo lng={lng} search={state.search} className="col-span-1" />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
