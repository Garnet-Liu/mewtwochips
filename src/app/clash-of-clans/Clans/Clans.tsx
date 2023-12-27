"use client";

import { Button, TextField } from "@radix-ui/themes";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

import { apiFetchRequest } from "@/context/apiFetchRequest";
import { IClanDetail } from "@/types/clashOfClans";

export function Clans() {
  const [tag, setTag] = useState("");
  const [detail, setDetail] = useState<IClanDetail>();
  const [loading, setLoading] = useState(false);

  const handleChangeTag = (event: ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value.replace("#", ""));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      console.log("handleSearch tag", tag);
      const data = await apiFetchRequest<IClanDetail>(`/api/clash-of-clans/clan?tag=${tag}`);

      console.log("data", data);
      setDetail(data);
    } catch (error) {
      console.log("Clans error", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <TextField.Root>
        <TextField.Slot color="tomato">#</TextField.Slot>

        <TextField.Input
          name="tag"
          value={tag}
          disabled={loading}
          autoComplete="off"
          onChange={handleChangeTag}
          placeholder="Search your Clan"
        />
      </TextField.Root>

      <Button disabled={loading} onClick={handleSearch}>
        Search
      </Button>

      {detail && (
        <div>
          <p>{detail.name}</p>

          <ul>
            {detail.memberList.map((member) => {
              const leagueUrl = member.league.iconUrls.small;
              return (
                <li key={member.tag} className="flex items-center gap-2">
                  <Image width={30} height={30} alt="league" src={leagueUrl} />
                  <p>{member.tag}</p>
                  <p>{member.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
