"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@repo/ui/components/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";

import { ControlActionsConcede } from "../control-actions-concede";
import { ControlActionsWithdraw } from "../control-actions-withdraw";
import { useGobangStore } from "../gobang-store";
import { EPiece, EPlayer } from "../types/role.type";
import { randomRange } from "../utils/random-range";

enum EDifficulty {
  SIMPLE = "4",
  MEDIUM = "6",
  DIFFICULTY = "8",
}

const startSchema = z.object({
  first: z.enum(EPlayer),
  deep: z.enum(EDifficulty),
});

interface IProps {
  player: EPiece;
  loading: boolean;
}

export function ControlActions(props: IProps) {
  const { player, loading } = props;

  const { startGame } = useGobangStore(
    useShallow((s) => {
      return { startGame: s.startGame };
    }),
  );

  // 1. Define your form.
  const form = useForm<z.infer<typeof startSchema>>({
    resolver: zodResolver(startSchema),
    defaultValues: { first: EPlayer.HUMAN, deep: EDifficulty.SIMPLE },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof startSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("=========> onSubmit", values);
    if (values.first === EPlayer.RANDOM) {
      startGame(!!randomRange(0, 1), Number(values.deep)).then();
    } else {
      startGame(values.first === EPlayer.HUMAN, Number(values.deep)).then();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          <Button type="submit" disabled={player !== EPiece.EMPTY || loading}>
            Start
          </Button>

          <ControlActionsWithdraw {...props} />

          <ControlActionsConcede {...props} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="first"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem className="flex items-center gap-1 space-y-0">
                <FormLabel>First:</FormLabel>
                <Select {...field} onValueChange={onChange} defaultValue={value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={EPlayer.HUMAN}>Human</SelectItem>
                      <SelectItem value={EPlayer.COMPUTER}>Computer</SelectItem>
                      <SelectItem value={EPlayer.RANDOM}>Random</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deep"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem className="flex items-center gap-1 space-y-0">
                <FormLabel>Difficulty:</FormLabel>
                <Select {...field} onValueChange={onChange} defaultValue={value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={EDifficulty.SIMPLE}>Simple</SelectItem>
                      <SelectItem value={EDifficulty.MEDIUM}>Medium</SelectItem>
                      <SelectItem value={EDifficulty.DIFFICULTY}>Difficulty</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
