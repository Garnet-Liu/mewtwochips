"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const BreakPricingSchema = z.enum(["AUCTION", "SET_PRICE"]);

const SellTypeSchema = z.enum(["whiteElephant", "buyNow"]);

const FormBaseSchema = z.object({
  sellType: SellTypeSchema,
});

const FormSchema = z.discriminatedUnion("sellType", [
  FormBaseSchema.extend({
    sellType: z.literal(SellTypeSchema.enum.whiteElephant),
    spotsAvailable: z.coerce.number().positive({ message: "Must be greater than 0." }),
    details: z.discriminatedUnion("pricing", [
      z.object({
        pricing: z.literal(BreakPricingSchema.enum.SET_PRICE),
        priceInCents: z.coerce.number().positive({ message: "Must be greater than 0." }),
      }),
      z.object({
        pricing: z.literal(BreakPricingSchema.enum.AUCTION),
        extendedBidding: z.boolean(),
        minimumBid: z.coerce.number().positive({ message: "Must be greater than 0." }),
      }),
    ]),
  }),
  FormBaseSchema.extend({
    sellType: z.literal(SellTypeSchema.enum.buyNow),
    quantity: z.coerce.number().positive({ message: "Must be greater than 0." }),
    priceInCents: z.coerce.number().positive({ message: "Must be greater than 0." }),
  }),
]);

type FormValues = z.infer<typeof FormSchema>;

export function DiscriminatedUnionForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { sellType: "buyNow" },
  });

  const sellType = form.watch("sellType");
  const pricing = form.watch("details.pricing");

  function onSubmit(values: FormValues) {
    console.log("onSubmit values", values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto flex w-80 flex-col gap-2">
        <FormField
          control={form.control}
          name="sellType"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Sell type</FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex gap-2"
                    {...field}
                    onValueChange={(value) => {
                      field.onChange(value);
                      if (value === "whiteElephant") {
                        form.setValue("details.pricing", BreakPricingSchema.enum.SET_PRICE);
                        form.unregister(["priceInCents", "quantity"]);
                      } else {
                        form.unregister(["details"]);
                      }
                    }}
                  >
                    <FormItem className="flex items-center space-y-0">
                      <FormControl>
                        <RadioGroupItem value="buyNow" />
                      </FormControl>
                      <FormLabel className="pl-3 font-normal">Buy now</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-y-0">
                      <FormControl>
                        <RadioGroupItem value="whiteElephant" />
                      </FormControl>
                      <FormLabel className="pl-3 font-normal">White elephant</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage>
                  <FormDescription>This is sell type.</FormDescription>
                </FormMessage>
              </FormItem>
            );
          }}
        />

        {sellType === "buyNow" && (
          <>
            <FormField
              control={form.control}
              name="priceInCents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage>
                    <FormDescription>This is sell price.</FormDescription>
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage>
                    <FormDescription>This is product stock.</FormDescription>
                  </FormMessage>
                </FormItem>
              )}
            />
          </>
        )}

        {sellType === "whiteElephant" && (
          <>
            <FormField
              control={form.control}
              name="details.pricing"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Pricing type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex gap-2"
                        onValueChange={(value) => {
                          field.onChange(value);
                          if (value === BreakPricingSchema.enum.SET_PRICE) {
                            form.unregister(["details.minimumBid", "details.extendedBidding"]);
                          } else {
                            form.setValue("details.extendedBidding", true);
                            form.unregister("details.priceInCents");
                          }
                        }}
                        defaultValue={field.value}
                      >
                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value={BreakPricingSchema.enum.SET_PRICE} />
                          </FormControl>
                          <FormLabel className="pl-3 font-normal">Set price</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value={BreakPricingSchema.enum.AUCTION} />
                          </FormControl>
                          <FormLabel className="pl-3 font-normal">Auction</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage>
                      <FormDescription>This is pricing type.</FormDescription>
                    </FormMessage>
                  </FormItem>
                );
              }}
            />

            {pricing === BreakPricingSchema.enum.SET_PRICE && (
              <>
                <FormField
                  control={form.control}
                  name="details.priceInCents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage>
                        <FormDescription>This is price.</FormDescription>
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </>
            )}

            {pricing === BreakPricingSchema.enum.AUCTION && (
              <>
                <FormField
                  control={form.control}
                  name="details.extendedBidding"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Marketing emails</FormLabel>
                          <FormMessage>
                            <FormDescription>
                              Receive emails about new products, features, and more.
                            </FormDescription>
                          </FormMessage>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="details.minimumBid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum bid</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage>
                        <FormDescription>This is minimum bid.</FormDescription>
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </>
            )}

            {pricing && (
              <FormField
                control={form.control}
                name="spotsAvailable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spots available</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage>
                      <FormDescription>This is spots available.</FormDescription>
                    </FormMessage>
                  </FormItem>
                )}
              />
            )}
          </>
        )}

        <Button type="submit">Submit form</Button>
      </form>

      <pre className="whitespace-pre-wrap">
        <code>{JSON.stringify(form.getValues(), null, 4)}</code>
      </pre>
    </Form>
  );
}
