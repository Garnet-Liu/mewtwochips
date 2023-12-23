"use client";

import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Button, TextField, Text } from "@radix-ui/themes";
import { FormInput } from "@/app/react-hook-form/page";

type Props = {
  className?: string;
};

export function FormTitle(props: Props) {
  const { className } = props;
  const { control } = useFormContext<FormInput>();
  const { replace } = useFieldArray({ control, name: "breakSpots" });
  const [breakSpots] = useWatch({
    control,
    name: ["breakSpots"],
  });

  console.log("breakSpots", breakSpots);

  const handleReplace = () => {
    console.log("handleReplace");
    replace([
      { label: "Test label 2", breakTemplateSpotId: "test-id-2", priceInCents: 9 },
      { label: "Test label 3", breakTemplateSpotId: "test-id-3", priceInCents: 9 },
      { label: "Test label 4", breakTemplateSpotId: "test-id-4", priceInCents: 9 },
    ]);
  };
  return (
    <div className="flex items-center gap-2">
      <Controller
        control={control}
        name="title"
        rules={{
          required: "This value is required.",
          maxLength: { value: 255, message: "The maximum length of this value is 255." },
        }}
        render={({ field, fieldState: { error } }) => (
          <label>
            <Text>Test title</Text>
            <TextField.Root>
              <TextField.Input className={className} size="3" {...field} />
            </TextField.Root>
          </label>
          // <TextInputForm
          //   label="Listing name"
          //   className={cn("flex-auto", className)}
          //   error={error}
          //   {...field}
          // />
        )}
      />

      <Button type="button" onClick={handleReplace}>
        Replace
      </Button>
    </div>
  );
}
