"use client";

import { usePlayer } from "@/app/games/components/player-provider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  playerCreateInputSchema,
  type PlayerCreateInput,
} from "@/schema/player";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

const avatars = [
  "/avatars/boys/1.png",
  "/avatars/boys/2.png",
  "/avatars/boys/3.png",
  "/avatars/boys/4.png",
  "/avatars/boys/5.png",
  "/avatars/boys/6.png",
  "/avatars/boys/7.png",
  "/avatars/boys/8.png",

  "/avatars/girls/1.png",
  "/avatars/girls/2.png",
  "/avatars/girls/3.png",
  "/avatars/girls/4.png",
  "/avatars/girls/5.png",
  "/avatars/girls/6.png",
  "/avatars/girls/7.png",
  "/avatars/girls/8.png",
];

export default function PlayerForm({
  onSubmit,
}: {
  onSubmit: (values: PlayerCreateInput) => Promise<void>;
}) {
  const { player } = usePlayer();
  const form = useForm<PlayerCreateInput>({
    resolver: zodResolver(playerCreateInputSchema),
    defaultValues: {
      name: player?.name || "",
      avatar: player?.avatar || "",
    },
  });

  const [selectedAvatar, setSelectedAvatar] = useState(player?.avatar || "");

  return (
    <Form {...form}>
      <form
        id="player-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-sm mx-auto rounded-2xl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose an Avatar</FormLabel>
              <div className="grid grid-cols-4 gap-3">
                {avatars.map((avatar) => (
                  <div
                    key={avatar}
                    onClick={() => {
                      field.onChange(avatar);
                      setSelectedAvatar(avatar);
                    }}
                    className={cn(
                      "cursor-pointer rounded-xl border-2 p-1 transition hover:scale-105",
                      selectedAvatar === avatar
                        ? "border-primary"
                        : "border-transparent"
                    )}
                  >
                    <Image
                      width={128}
                      height={128}
                      src={avatar}
                      alt="avatar"
                      className="rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
