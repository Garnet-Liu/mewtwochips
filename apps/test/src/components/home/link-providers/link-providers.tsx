import { EProviderID } from "@/types/auth";
import { Github, Google, Mail } from "@/components/svgs";
import { ProviderItem } from "@/components/home/provider-item";

export function LinkProviders() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <ProviderItem providerId={EProviderID.EMAIL} icon={<Mail />} />

      <ProviderItem providerId={EProviderID.GITHUB} icon={<Github />} />

      <ProviderItem providerId={EProviderID.GOOGLE} icon={<Google />} />
    </div>
  );
}
