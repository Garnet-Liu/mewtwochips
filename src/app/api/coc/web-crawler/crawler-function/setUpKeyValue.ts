import { Defense } from "@/gql/graphql";
import { translateTime } from "@/app/api/coc/web-crawler/crawler-function/translateTime";

export const createLevelKey = () => {
  return [
    { name: ["Level"], key: "level", index: 0 },
    { name: ["Hitpoints"], key: "hitpoints", index: 1 },
    { name: ["Cost", "Build Cost"], key: "buildCost", index: 2 },
    { name: ["Build Time"], key: "buildTime", index: 3 },
    { name: ["Experience Gained"], key: "experienceGained", index: 4 },
    { name: ["Town Hall Level Required"], key: "townHallLevelRequired", index: 5 },
  ];
};

export const setLevelNormal = (data: Defense, value: string, index: number): void => {
  data.level = data.level || [];
  if (data?.level?.[index]) {
    data!.level![index]!.normal = value;
  } else {
    data!.level![index] = { normal: value };
  }
};

export const setLevelLevel = (data: Defense, value: string, index: number): void => {
  data.level = data.level || [];
  if (data?.level?.[index]) {
    data!.level![index]!.level = Number(value);
  } else {
    data!.level![index] = { level: Number(value) };
  }
};

export const setLevelHitpoints = (data: Defense, value: string, index: number): void => {
  data.level = data.level || [];
  if (data?.level?.[index]) {
    data!.level![index]!.hitpoints = formatStringNumber(value);
  } else {
    data!.level![index] = { hitpoints: formatStringNumber(value) };
  }
};

export const setLevelBuildCost = (
  data: Defense,
  value: string,
  index: number,
  type: string,
): void => {
  data.level = data.level || [];
  if (data?.level?.[index]) {
    data!.level![index]!.buildCost = { [type]: formatStringNumber(value) };
  } else {
    data!.level![index] = { buildCost: { [type]: formatStringNumber(value) } };
  }
};

export const setLevelBuildTime = (data: Defense, value: string, index: number): void => {
  data.level = data.level || [];
  if (data?.level?.[index]) {
    data!.level![index]!.buildTime = translateTime(value);
  } else {
    data!.level![index] = { buildTime: translateTime(value) };
  }
};

export const setLevelExperienceGained = (data: Defense, value: string, index: number): void => {
  data.level = data.level || [];
  if (data?.level?.[index]) {
    data!.level![index]!.experienceGained = formatStringNumber(value);
  } else {
    data!.level![index] = { experienceGained: formatStringNumber(value) };
  }
};

export const setLevelTownHallLevelRequired = (
  data: Defense,
  value: string,
  index: number,
): void => {
  data.level = data.level || [];
  if (data?.level?.[index]) {
    data!.level![index]!.townHallLevelRequired = Number(value);
  } else {
    data!.level![index] = { townHallLevelRequired: Number(value) };
  }
};

export const formatStringNumber = (value: string) => {
  return Number(value.replace(/,/g, ""));
};
