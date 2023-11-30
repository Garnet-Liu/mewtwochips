"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { IProfile } from "@/interfaces/profile.interface";
import { IClanDetail } from "@/interfaces/clash-of-clans.interface";
import { clientFetchRequest } from "@/services/fetch-request.service";

interface IClanTableProps {
  addBtn?: boolean;
  deleteBtn?: boolean;
  profile: IProfile;
  clanList: IClanDetail[];
}

export default function ClanTable({ clanList, addBtn, deleteBtn, profile }: IClanTableProps) {
  const route = useRouter();

  console.log('clanList', clanList);

  const handleClanAdd = async (clan: IClanDetail) => {
    console.log("handleClanAdd", clan);
    try {
      const addRequest = await clientFetchRequest(
        "/api/clash-of-clans/profile",
        {
          method: "put",
          body: JSON.stringify({ ...profile, clans: Array.from(new Set([...profile.clans, clan.tag])) })
        }
      );
      console.log("addRequest", addRequest);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleClanDelete = async (clan: IClanDetail) => {
    console.log("handleClanDelete", clan);
    try {
      const clans = profile.clans.filter((t) => t !== clan.tag);
      const addRequest = await clientFetchRequest(
        "/api/clash-of-clans/profile",
        { method: "put", body: JSON.stringify({ ...profile, clans: clans }) }
      );
      console.log("addRequest", addRequest);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleJumpClan = (tag: string) => {
    console.log("handleJumpClan", tag);
    route.push(`/clash-of-clans/${encodeURIComponent(tag)}`);
  };
  return (
    <div>部落</div>
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>ID</TableCell>
    //         <TableCell>联赛等级</TableCell>
    //         <TableCell>语言</TableCell>
    //         <TableCell>部落</TableCell>
    //         <TableCell>等级</TableCell>
    //         <TableCell>成员</TableCell>
    //         <TableCell>标签</TableCell>
    //         {(addBtn || deleteBtn) && <TableCell></TableCell>}
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {clanList.map((clan) => (
    //         <TableRow key={clan.tag} sx={{ cursor: "pointer" }} hover onClick={() => handleJumpClan(clan.tag)}>
    //           <TableCell component="th" scope="row">{clan.tag}</TableCell>
    //           <TableCell>{clan?.warLeague?.name}</TableCell>
    //           <TableCell>{clan?.chatLanguage?.name}</TableCell>
    //           <TableCell>
    //             <div className="flex items-center">
    //               <Image src={clan.badgeUrls.small} width="32" height="32" alt="badge"/>
    //               {clan?.name}
    //             </div>
    //           </TableCell>
    //           <TableCell>{clan.clanLevel}</TableCell>
    //           <TableCell>{clan.memberList.length}</TableCell>
    //           <TableCell>
    //             <div className="flex items-center">
    //               {clan.labels.map((label) => (
    //                 <Image key={label.iconUrls.small} src={label.iconUrls.small} width="32" height="32" alt="label"/>
    //               ))}
    //             </div>
    //           </TableCell>
    //
    //           {addBtn && (
    //             <TableCell>
    //               <Button variant="outlined" onClick={() => handleClanAdd(clan)}>添加</Button>
    //             </TableCell>
    //           )}
    //
    //           {deleteBtn && (
    //             <TableCell>
    //               <Button variant="outlined" onClick={() => handleClanDelete(clan)}>删除</Button>
    //             </TableCell>
    //           )}
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}
