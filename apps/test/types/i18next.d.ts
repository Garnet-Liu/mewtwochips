// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import { defaultNS } from "@/libs/i18n/settings";
import home from "@/libs/i18n/locales/zh-CN/home.json";
import gobang from "@/libs/i18n/locales/zh-CN/gobang.json";
import counter from "@/libs/i18n/locales/zh-CN/counter.json";
import translation from "@/libs/i18n/locales/zh-CN/translation.json";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: defaultNS;
    // custom resources type
    resources: {
      home: typeof home;
      gobang: typeof gobang;
      counter: typeof counter;
      translation: typeof translation;
    };
    // other
  }
}
