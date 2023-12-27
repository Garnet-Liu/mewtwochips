import { format as formatDate, isDate, Locale } from "date-fns";
import { enUS, zhCN } from "date-fns/locale";
import { InitOptions } from "i18next";

import { env } from "../../env.mjs";

export const fallbackLng = "zh";
export const cookieName = "i18next";
export const defaultNS = "translation";
export const languages = [fallbackLng, "en"];
export const locales: Record<string, Locale> = { en: enUS, zh: zhCN };

export function getOptions(lng = fallbackLng, ns = defaultNS): InitOptions {
  return {
    debug: env.NEXT_PUBLIC_NODE_ENV !== "production",
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    interpolation: {
      format: (value, format, lng) => {
        if (isDate(value)) {
          const locale = locales[lng || fallbackLng];
          return formatDate(value, format || "", { locale });
        } else {
          return value;
        }
      },
    },
  };
}
