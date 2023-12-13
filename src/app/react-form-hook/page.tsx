"use client";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button } from "@radix-ui/themes";

interface FormInput {
  firstName: string;
}

export default function Page() {
  const methods = useForm<FormInput>({
    defaultValues: { firstName: "Garnet" },
    mode: "onTouched",
    shouldUnregister: true,
  });

  const onSubmit = (value: FormInput) => {
    console.log("value", value);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Controller
          control={methods.control}
          name="firstName"
          rules={{
            required: "This value is required.",
            maxLength: { value: 255, message: "The maximum length of this value is 255." },
          }}
          disabled={true}
          render={({ field, fieldState }) => {
            console.log("fieldState", fieldState);
            return <input {...field} />;
          }}
        />

        <Button>Save</Button>
      </form>
    </FormProvider>
  );
}
