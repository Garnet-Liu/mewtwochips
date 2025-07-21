"use client";

import { FlatNamespace, KeyPrefix } from "i18next";
import { useParams } from "next/navigation";
import {
  FallbackNs,
  useTranslation,
  UseTranslationOptions,
  UseTranslationResponse,
} from "react-i18next";

import i18next from "@/libs/i18n/i18next";

const runsOnServerSide = typeof window === "undefined";

export function useT<
  Ns extends FlatNamespace,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(
  ns?: Ns,
  options?: UseTranslationOptions<KPrefix>,
): UseTranslationResponse<FallbackNs<Ns>, KPrefix> {
  const { lng } = useParams<{ lng?: string }>();

  if (typeof lng !== "string") throw new Error("useT is only available inside /app/[lng]");

  if (runsOnServerSide && lng && i18next.resolvedLanguage !== lng) {
    console.log("running on server side, change language to", lng);
    i18next.changeLanguage(lng).then(() => {
      console.log(`change language to ${lng} successfully`);
    });
  }

  return useTranslation(ns, { ...options, lng });
}
