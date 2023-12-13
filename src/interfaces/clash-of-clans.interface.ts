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
  memberList: [];
  labels: Array<{ iconUrls: { small: string; medium: string; }; id: string; name: string; }>;
}

export interface IEventTime {
  time: string;
  active: boolean;
}

export interface IClanError {
  reason: string;
  message: string;
}
