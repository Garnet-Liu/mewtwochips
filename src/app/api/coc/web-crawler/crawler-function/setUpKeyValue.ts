import { Building } from "@/gql/graphql";
import { translateTime } from "@/app/api/coc/web-crawler/crawler-function/translateTime";

export const createLevelKey = () => {
  return [
    { name: ["Level", "TH Level"], key: "level", index: -1 },
    { name: ["Hitpoints"], key: "hitpoints", index: -1 },
    { name: ["Cost", "Build Cost", "Research Cost"], key: "cost", index: -1 },
    { name: ["Build Time", "Research Time"], key: "time", index: -1 },
    { name: ["Experience Gained"], key: "experienceGained", index: -1 },
    { name: ["Town Hall Level Required"], key: "townHallLevelRequired", index: -1 },
    { name: ["Laboratory Level Required"], key: "laboratoryLevelRequired", index: -1 },
  ];
};

export const setLevelNormal = (data: Building, value: string, index: number): void => {
  data.level = data.level || [];
  if (data?.level?.[index]) {
    data!.level![index]!.normal = value;
  } else {
    data!.level![index] = { normal: value };
  }
};

export const setLevelLevel = (data: Building, value: string, index: number): void => {
  data.level = data.level || [];
  if (data?.level?.[index]) {
    data!.level![index]!.level = formatStringNumber(value);
  } else {
    data!.level![index] = { level: formatStringNumber(value) };
  }
};

export const setLevelHitpoints = (data: Building, value: string, index: number): void => {
  data.level = data.level || [];
  if (data?.level?.[index]) {
    data!.level![index]!.hitpoints = formatStringNumber(value);
  } else {
    data!.level![index] = { hitpoints: formatStringNumber(value) };
  }
};

export const setLevelCost = (data: Building, value: string, index: number, type: string): void => {
  data.level = data.level || [];
  if (data?.level?.[index]) {
    data!.level![index]!.cost = { [type]: formatStringNumber(value) };
  } else {
    data!.level![index] = { cost: { [type]: formatStringNumber(value) } };
  }
};

export const setLevelTime = (data: Building, value: string, index: number): void => {
  data.level = data.level || [];
  if (data?.level?.[index]) {
    data!.level![index]!.time = translateTime(value);
  } else {
    data!.level![index] = { time: translateTime(value) };
  }
};

export const setLevelExperienceGained = (data: Building, value: string, index: number): void => {
  data.level = data.level || [];
  if (data?.level?.[index]) {
    data!.level![index]!.experienceGained = formatStringNumber(value);
  } else {
    data!.level![index] = { experienceGained: formatStringNumber(value) };
  }
};

export const setLevelTownHallLevelRequired = (
  data: Building,
  value: string,
  index: number,
): void => {
  data.level = data.level || [];
  if (data?.level?.[index]) {
    data!.level![index]!.townHallLevelRequired = formatStringNumber(value);
  } else {
    data!.level![index] = { townHallLevelRequired: formatStringNumber(value) };
  }
};

export const setLevelLaboratoryLevelRequired = (
  data: Building,
  value: string,
  index: number,
): void => {
  data.level = data.level || [];
  if (data?.level?.[index]) {
    data!.level![index]!.laboratoryLevelRequired = formatStringNumber(value);
  } else {
    data!.level![index] = { laboratoryLevelRequired: formatStringNumber(value) };
  }
};

export const formatStringNumber = (value: string) => {
  const replaceValue = value.replace(/,/g, "");
  return !isNaN(Number(replaceValue)) ? Number(replaceValue) : 0;
};
