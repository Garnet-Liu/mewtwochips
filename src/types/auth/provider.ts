export enum EProviderID {
  EMAIL = "password",
  GITHUB = "github.com",
  GOOGLE = "google.com",
}

export const providers = new Map<EProviderID, string>([
  [EProviderID.EMAIL, "email"],
  [EProviderID.GITHUB, "github"],
  [EProviderID.GOOGLE, "google"],
]);
