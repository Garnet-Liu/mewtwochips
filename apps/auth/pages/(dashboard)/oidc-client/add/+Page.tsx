import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { cn } from "@repo/ui/lib/utils";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const AuthApplicationSchema = z.object({
  redirect_uris: z.array(z.url({ error: "Each redirect URI must be a valid URL" })).meta({
    description: 'A list of redirect URIs. Eg: ["https://client.example.com/callback"]',
  }),
  token_endpoint_auth_method: z
    .enum(["none", "client_secret_basic", "client_secret_post"], {
      error: "Invalid token endpoint auth method",
    })
    .meta({
      description: 'The authentication method for the token endpoint. Eg: "client_secret_basic"',
    })
    .default("client_secret_basic")
    .optional(),
  grant_types: z
    .array(
      z.enum(
        [
          "authorization_code",
          "implicit",
          "password",
          "client_credentials",
          "refresh_token",
          "urn:ietf:params:oauth:grant-type:jwt-bearer",
          "urn:ietf:params:oauth:grant-type:saml2-bearer",
        ],
        { error: "Invalid grant type" },
      ),
    )
    .meta({
      description: 'The grant types supported by the application. Eg: ["authorization_code"]',
    })
    .default(["authorization_code"])
    .optional(),
  response_types: z
    .array(z.enum(["code", "token"], { error: "Invalid response type" }))
    .meta({
      description: 'The response types supported by the application. Eg: ["code"]',
    })
    .default(["code"])
    .optional(),
  client_name: z
    .string()
    .meta({
      description: 'The name of the application. Eg: "My App"',
    })
    .optional(),
  client_uri: z
    .url({ error: "Client URI must be a valid URL" })
    .meta({
      description: 'The URI of the application. Eg: "https://client.example.com"',
    })
    .optional(),
  logo_uri: z
    .url({ error: "Logo URI must be a valid URL" })
    .meta({
      description: 'The URI of the application logo. Eg: "https://client.example.com/logo.png"',
    })
    .optional(),
  scope: z
    .string()
    .meta({
      description:
        'The scopes supported by the application. Separated by spaces. Eg: "profile email"',
    })
    .optional(),
  contacts: z
    .array(z.string())
    .meta({
      description: 'The contact information for the application. Eg: ["admin@example.com"]',
    })
    .optional(),
  tos_uri: z
    .url({ error: "Tos URI must be a valid URL" })
    .meta({
      description:
        'The URI of the application terms of service. Eg: "https://client.example.com/tos"',
    })
    .optional(),
  policy_uri: z
    .url({ error: "Policy URI must be a valid URL" })
    .meta({
      description:
        'The URI of the application privacy policy. Eg: "https://client.example.com/policy"',
    })
    .optional(),
  jwks_uri: z
    .url({ error: "JWTS URI must be a valid URL" })
    .meta({
      description: 'The URI of the application JWKS. Eg: "https://client.example.com/jwks"',
    })
    .optional(),
  jwks: z
    .record(z.any(), z.any())
    .meta({
      description:
        'The JWKS of the application. Eg: {"keys": [{"kty": "RSA", "alg": "RS256", "use": "sig", "n": "...", "e": "..."}]}',
    })
    .optional(),
  metadata: z
    .record(z.any(), z.any())
    .meta({
      description: 'The metadata of the application. Eg: {"key": "value"}',
    })
    .optional(),
  software_id: z
    .string()
    .meta({
      description: 'The software ID of the application. Eg: "my-software"',
    })
    .optional(),
  software_version: z
    .string()
    .meta({
      description: 'The software version of the application. Eg: "1.0.0"',
    })
    .optional(),
  software_statement: z
    .string()
    .meta({
      description: "The software statement of the application.",
    })
    .optional(),
});

type AuthApplication = z.infer<typeof AuthApplicationSchema>;

export default function Page() {
  const form = useForm<AuthApplication>({
    resolver: zodResolver(AuthApplicationSchema),
    defaultValues: { redirect_uris: [] },
  });

  const onSubmit = useCallback(async (data: AuthApplication) => {
    console.log("data", data);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl">OIDC Client Add form</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid grid-cols-2 gap-2")}>
          <FormField
            control={form.control}
            name="client_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client name</FormLabel>
                <FormControl>
                  <Input placeholder="Mewtwochips auth" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
