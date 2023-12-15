"use client";

import { Button, Code, TextField } from "@radix-ui/themes";
import { ChangeEvent, useState } from "react";

import { clientFetchRequest } from "@/services/fetch-request.service";
import { IClanDetail } from "@/app/clash-of-clans/interfaces/clashOfSlans.interface";

export function Clans() {
  const [tag, setTag] = useState("");

  const [detail, setDetail] = useState("");

  const handleChangeTag = (event: ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };

  const handleSearch = async () => {
    const data = await clientFetchRequest<IClanDetail>(`/api/clash-of-clans/clan?tag=${tag}`);

    console.log("data", data);
    setDetail(JSON.stringify(data));
  };

  return (
    <div>
      <TextField.Root>
        <TextField.Slot color="tomato">#</TextField.Slot>

        <TextField.Input
          name="tag"
          value={tag}
          onChange={handleChangeTag}
          placeholder="Search your Clan"
        />
      </TextField.Root>

      <Button onClick={handleSearch}>Search</Button>

      <Code>{detail}</Code>
    </div>
  );
}
