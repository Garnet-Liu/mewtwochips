"use client";

import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Button, TextField } from "@radix-ui/themes";

import { FormInput } from "../../page";

export function FormAssignPrices() {
  const { control } = useFormContext<FormInput>();
  const { fields, replace } = useFieldArray({
    control,
    name: "breakSpots",
  });

  console.log("fields", fields);

  return fields.map((f, index) => {
    return (
      <div className="flex items-center gap-2" key={f.id}>
        <Button
          type="button"
          onClick={() => {
            replace([
              { label: "Test label 2", breakTemplateSpotId: "test-id-2", priceInCents: 9 },
              { label: "Test label 3", breakTemplateSpotId: "test-id-3", priceInCents: 9 },
              { label: "Test label 4", breakTemplateSpotId: "test-id-4", priceInCents: 9 },
            ]);
          }}
        >
          Replace
        </Button>

        <Controller
          control={control}
          name={`breakSpots.${index}.label`}
          rules={{
            required: "This value is required.",
            min: { value: 1, message: "The minimum value must be 1." },
            max: { value: 10000000, message: "The maximum value must be 10000000." },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField.Root>
              <TextField.Root size="3" {...field} />
            </TextField.Root>
          )}
        />

        <Controller
          control={control}
          name={`breakSpots.${index}.priceInCents`}
          rules={{
            required: "This value is required.",
            min: { value: 1, message: "The minimum value must be 1." },
            max: { value: 10000000, message: "The maximum value must be 10000000." },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField.Root>
              <TextField.Root size="3" {...field} />
            </TextField.Root>
          )}
        />
      </div>
    );
  });
}
