"use client";

import PlayerForm from "@/app/games/components/player-form";
import { usePlayer } from "@/app/games/components/player-provider";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCreateOne, useEditOne } from "@/hooks/api";
import type {
  Player,
  PlayerCreateInput,
  PlayerUpdateInput,
} from "@/schema/player";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

export default function PlayerModal() {
  const { isPlayerModalOpen, player, setPlayer, togglePlayerModal } =
    usePlayer();
  const { mutate: createPlayer, isPending: isCreating } = useCreateOne<
    Player,
    PlayerCreateInput
  >({
    path: "/api/players",
    queryKey: "players",
  });
  const { mutate: updatePlayer, isPending: isUpdating } = useEditOne<
    Player,
    PlayerUpdateInput
  >({
    path: "/api/players",
    queryKey: "players",
  });
  const loading = isCreating || isUpdating;

  const title = player ? "Edit profile" : "New profile";
  const description = player ? "Update your profile" : "Create a new profile";
  const submitLabel = player ? "Update" : "Create";

  const onSubmit = async (values: PlayerCreateInput) => {
    if (!player) {
      createPlayer(values, {
        onSuccess: (data) => {
          setPlayer(data);
          toast.success(`Welcome, ${data.name}!`);
          localStorage.setItem("playerId", data.id);
        },
      });
    } else {
      updatePlayer(
        {
          ...values,
          id: player.id,
        },
        {
          onSuccess: (data) => {
            setPlayer(data);
            toast.success(`Profile updated, ${data.name}!`);
          },
        }
      );
    }

    togglePlayerModal();
  };

  return (
    <Drawer direction="top" dismissible={false} open={isPlayerModalOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-1 pb-0">
            <PlayerForm onSubmit={onSubmit} />
          </div>
          <DrawerFooter className="flex-row justify-center">
            {player && (
              <Button variant="outline" onClick={() => togglePlayerModal()}>
                Cancel
              </Button>
            )}

            <Button type="submit" form="player-form" disabled={loading}>
              {loading && <Loader2Icon className="animate-spin" />}
              {submitLabel}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
