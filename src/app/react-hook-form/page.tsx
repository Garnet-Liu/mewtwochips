"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@radix-ui/themes";

import { FormTitle } from "@/app/react-hook-form/components/FormTitle/FormTitle";
import { FormAssignPrices } from "@/app/react-hook-form/components/FormAssignPrices/FormAssignPrices";

export type FormInput = {
  title: string;
  breakSpots: BreakSpotInput[];
};

type BreakSpotInput = {
  label: string;
  priceInCents: number;
  breakTemplateSpotId: string;
};

export default function Page() {
  const methods = useForm<FormInput>({
    defaultValues: {
      title: "Test title",
      breakSpots: [{ label: "Test label 1", breakTemplateSpotId: "test-id-1" }],
    },
    // shouldFocusError: false,
    // mode: "onTouched",
  });

  const onSubmit = (values: FormInput) => {
    console.log("onSubmit values", values);
  };

  return (
    <div className="p-4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormTitle />

          <FormAssignPrices />

          <Button>Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
}
