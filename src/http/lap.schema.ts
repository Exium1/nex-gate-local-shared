import Type, { Static } from "@sinclair/typebox";
import { Nullable, UUIDField } from "../common.schema.js";

export const LapSchema = Type.Object({
  id: UUIDField,
  raceSessionId: UUIDField,
  pilotName: Nullable(Type.String()),
  lapDuration: Nullable(Type.Number()),
  gateCount: Type.Integer(),
  startedAt: Type.Number()
});

export type Lap = Static<typeof LapSchema>;

export const CompletedLapSchema = Type.Composite([
  LapSchema,
  Type.Object({
    lapDuration: Type.Number()
  })
])

export type CompletedLap = Static<typeof CompletedLapSchema>;