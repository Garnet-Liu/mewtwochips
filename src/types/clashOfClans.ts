export interface IClanDetail {
  name: string;
  tag: string;
  chatLanguage?: {
    id: number;
    languageCode: string;
    name: string;
  };
  badgeUrls: {
    large: string;
    medium: string;
    small: string;
  };
  warLeague: { id: number; name: string };
  clanLevel: number;
  memberList: IMember[];
  labels: Array<{ iconUrls: { small: string; medium: string }; id: string; name: string }>;
}

export interface IMember {
  builderBaseLeague: { id: number; name: string };
  builderBaseTrophies: number;
  clanRank: number;
  donations: number;
  donationsReceived: number;
  expLevel: number;
  league: {
    id: number;
    name: string;
    iconUrls: { small: string; tiny: string; medium: string };
  };
  name: string;
  playerHouse: { elements: Array<{ id: number; type: string }> };
  previousClanRank: number;
  role: string;
  tag: string;
  townHallLevel: number;
  trophies: number;
}

export interface IClanError {
  reason: string;
  message: string;
}
