"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
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

const PricingType = z.enum(["AUCTION", "SET_PRICE"]);

const SellType = z.enum(["WHITE_ELEPHANT", "BUY_NOW"]);

const BaseSchema = z.object({
  sell: SellType,
});

const BuyNowBaseSchema = BaseSchema.extend({
  sell: z.literal(SellType.enum.BUY_NOW),
  pricing: PricingType,
  spotsAvailable: z.coerce.number().positive({ message: "Must be greater than 0." }),
});

const WhiteElephantBaseSchema = BaseSchema.extend({
  sell: z.literal(SellType.enum.WHITE_ELEPHANT),
  pricing: PricingType,
  quantity: z.coerce.number().positive({ message: "Must be greater than 0." }),
});

const BuyNowAuctionSchema = BuyNowBaseSchema.extend({
  pricing: z.literal(PricingType.enum.AUCTION),
  priceInCents: z.coerce.number().positive({ message: "Must be greater than 0." }),
});

const BuyNowSetPriceSchema = BuyNowBaseSchema.extend({
  pricing: z.literal(PricingType.enum.SET_PRICE),
  minimumBidAmountInCents: z.coerce.number().positive({ message: "Must be greater than 0." }),
});

const BuyNowSchema = z.discriminatedUnion("pricing", [BuyNowSetPriceSchema, BuyNowAuctionSchema]);

const WhiteElephantAuctionSchema = WhiteElephantBaseSchema.extend({
  pricing: z.literal(PricingType.enum.AUCTION),
  extendedBidding: z.boolean(),
});

const WhiteElephantSetPriceSchema = WhiteElephantBaseSchema.extend({
  pricing: z.literal(PricingType.enum.SET_PRICE),
  minimumBid: z.coerce.number().positive({ message: "Must be greater than 0." }),
});

const WhiteElephantSchema = z.discriminatedUnion("pricing", [
  WhiteElephantAuctionSchema,
  WhiteElephantSetPriceSchema,
]);

const FormSchema = z
  .union([...BuyNowSchema.options, ...WhiteElephantSchema.options])
  .superRefine((d, ctx) => {
    if (d.sell === SellType.enum.BUY_NOW && d.pricing === PricingType.enum.SET_PRICE) {
      if (d.minimumBidAmountInCents > 100) {
        ctx.addIssue({
          message: "this is a error",
          path: ["minimumBidAmountInCents"],
          code: "custom",
        });
      }
    }
  });

type FormValues = z.infer<typeof FormSchema>;

export function DiscriminatedUnionForm() {
  const form = useForm<FormValues>({
    shouldFocusError: false,
    mode: "onSubmit",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sell: SellType.enum.BUY_NOW,
      pricing: PricingType.enum.SET_PRICE,
      spotsAvailable: 0,
      minimumBidAmountInCents: 0,
    },
  });

  const sell = form.watch("sell");
  const pricing = form.watch("pricing");

  function onSubmit(values: FormValues) {
    console.log("onSubmit values", values);
  }

  const setSubValuesHandle = useCallback(
    (sell: z.infer<typeof SellType>, pricing: z.infer<typeof PricingType>) => {
      if (sell === SellType.enum.BUY_NOW) {
        if (pricing === PricingType.enum.AUCTION) {
          // form.unregister(["minimumBidAmountInCents", "extendedBidding", "minimumBid"]);
          const value = form.getValues("priceInCents");
          if (!value) {
            form.setValue("priceInCents", 0);
          }
        } else {
          // form.unregister(["extendedBidding", "priceInCents", "minimumBid"]);
          const value = form.getValues("minimumBidAmountInCents");
          if (!value) {
            form.setValue("minimumBidAmountInCents", 0);
          }
        }
      } else {
        if (pricing === PricingType.enum.AUCTION) {
          // form.unregister(["minimumBidAmountInCents", "priceInCents", "minimumBid"]);
          const value = form.getValues("extendedBidding");
          if (value === undefined) {
            form.setValue("extendedBidding", false);
          }
        } else {
          // form.unregister(["minimumBidAmountInCents", "extendedBidding", "priceInCents"]);
          const value = form.getValues("minimumBid");
          if (!value) {
            form.setValue("minimumBid", 0);
          }
        }
      }
    },
    [form],
  );

  const setSellValueHandle = useCallback(
    (sell: z.infer<typeof SellType>) => {
      if (sell === SellType.enum.BUY_NOW) {
        // form.unregister(["quantity"]);
        const value = form.getValues("spotsAvailable");
        if (!value) {
          form.setValue("spotsAvailable", 0);
        }
      } else {
        // form.unregister(["spotsAvailable"]);
        const value = form.getValues("quantity");
        if (!value) {
          form.setValue("quantity", 0);
        }
      }
    },
    [form],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto flex w-80 flex-col gap-2">
        <FormField
          control={form.control}
          name="sell"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Sell type</FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex gap-2"
                    {...field}
                    onValueChange={(v) => {
                      setSellValueHandle(v as z.infer<typeof SellType>);
                      setSubValuesHandle(v as z.infer<typeof SellType>, pricing);
                      field.onChange(v);
                    }}
                  >
                    <FormItem className="flex items-center space-y-0">
                      <FormControl>
                        <RadioGroupItem value={SellType.enum.BUY_NOW} />
                      </FormControl>
                      <FormLabel className="pl-3 font-normal">Buy now</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-y-0">
                      <FormControl>
                        <RadioGroupItem value={SellType.enum.WHITE_ELEPHANT} />
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

        <FormField
          control={form.control}
          name="pricing"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Pricing type</FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex gap-2"
                    {...field}
                    onValueChange={(v) => {
                      setSubValuesHandle(sell, v as z.infer<typeof PricingType>);
                      field.onChange(v);
                    }}
                  >
                    <FormItem className="flex items-center space-y-0">
                      <FormControl>
                        <RadioGroupItem value={PricingType.enum.SET_PRICE} />
                      </FormControl>
                      <FormLabel className="pl-3 font-normal">Set price</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-y-0">
                      <FormControl>
                        <RadioGroupItem value={PricingType.enum.AUCTION} />
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

        {sell === SellType.enum.BUY_NOW && (
          <FormField
            control={form.control}
            name="spotsAvailable"
            render={({ field: { value, ...field }, fieldState: { isDirty } }) => (
              <FormItem>
                <FormLabel>Spots available</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={isDirty ? value : value || ""} />
                </FormControl>
                <FormMessage>
                  <FormDescription>This is spots available.</FormDescription>
                </FormMessage>
              </FormItem>
            )}
          />
        )}

        {sell === SellType.enum.WHITE_ELEPHANT && (
          <FormField
            control={form.control}
            name="quantity"
            render={({ field: { value, ...field }, fieldState: { isDirty } }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={isDirty ? value : value || ""} />
                </FormControl>
                <FormMessage>
                  <FormDescription>This is product stock.</FormDescription>
                </FormMessage>
              </FormItem>
            )}
          />
        )}

        {sell === SellType.enum.BUY_NOW && pricing === PricingType.enum.AUCTION && (
          <FormField
            control={form.control}
            name="priceInCents"
            render={({ field: { value, ...field }, fieldState: { isDirty } }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={isDirty ? value : value || ""} />
                </FormControl>
                <FormMessage>
                  <FormDescription>This is price.</FormDescription>
                </FormMessage>
              </FormItem>
            )}
          />
        )}

        {sell === SellType.enum.BUY_NOW && pricing === PricingType.enum.SET_PRICE && (
          <FormField
            control={form.control}
            name="minimumBidAmountInCents"
            render={({ field: { value, ...field }, fieldState: { isDirty } }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={isDirty ? value : value || ""} />
                </FormControl>
                <FormMessage>
                  <FormDescription>This is sell price.</FormDescription>
                </FormMessage>
              </FormItem>
            )}
          />
        )}

        {sell === SellType.enum.WHITE_ELEPHANT && pricing === PricingType.enum.AUCTION && (
          <FormField
            control={form.control}
            name="extendedBidding"
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
        )}

        {sell === SellType.enum.WHITE_ELEPHANT && pricing === PricingType.enum.SET_PRICE && (
          <FormField
            control={form.control}
            name="minimumBid"
            render={({ field: { value, ...field }, fieldState: { isDirty } }) => (
              <FormItem>
                <FormLabel>Minimum bid</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={isDirty ? value : value || ""} />
                </FormControl>
                <FormMessage>
                  <FormDescription>This is minimum bid.</FormDescription>
                </FormMessage>
              </FormItem>
            )}
          />
        )}

        <Button type="submit">Submit form</Button>
      </form>

      <pre className="whitespace-pre-wrap">
        <code>{JSON.stringify(form.getValues(), null, 4)}</code>
      </pre>
    </Form>
  );
}
