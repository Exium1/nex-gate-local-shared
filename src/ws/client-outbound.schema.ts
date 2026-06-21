import { Type, Static } from '@sinclair/typebox'
import { GateEventSchema } from '../http/gate-event.schema.js'
import { Nullable, RoleSchema, UUIDField } from '../common.schema.js';
import { CompletedLapSchema } from '../http/lap.schema.js';
import { WsErrorCodeMessageSchema } from './errors.schema.js';

// === Enriched data with color and splits ===
export const EnrichedGateEventSchema = Type.Intersect([
  GateEventSchema,
  Type.Object({
    color: Nullable(Type.Union([
      Type.Literal("purple"),
      Type.Literal("yellow"),
      Type.Literal("green"),
      Type.Literal("red"),
      Type.Literal("neutral"),
    ])),
    allTimeFastestSplitDiffMs: Nullable(Type.Number()),
    sessionFastestSplitDiffMs: Nullable(Type.Number()),
    previousSplitDiffMs: Nullable(Type.Number()),
  })
])
export type EnrichedGateEvent = Static<typeof EnrichedGateEventSchema>;

export const EnrichedGateEventMessageSchema = Type.Object({
  type: Type.Literal("RICH_GATE_EVENT"),
  payload: EnrichedGateEventSchema,
})
export type EnrichedGateEventMessage = Static<typeof EnrichedGateEventMessageSchema>;

// === Lap data with force set completed field
export const LapCompletedMessageSchema = Type.Object({
  type: Type.Literal("LAP_COMPLETED"),
  payload: CompletedLapSchema,
})
export type LapCompletedMessage = Static<typeof LapCompletedMessageSchema>;

// === Join race session response
const ClientSchema = Type.Object({
  id: UUIDField,
  role: RoleSchema
})

const SessionSchema = Type.Object({
  id: Type.String(),
  mode: Type.String(),
  startedAt: Type.Integer(),
})

export const JoinRaceSessionResponseSchema = Type.Object({
  client: ClientSchema,
  session: SessionSchema
})
export type JoinRaceSessionResponse = Static<typeof JoinRaceSessionResponseSchema>;

export const JoinRaceSessionResponseMessageSchema = Type.Object({
  type: Type.Literal("JOIN_RESPONSE"),
  requestId: Type.Integer(),
  payload: JoinRaceSessionResponseSchema
})
export type JoinRaceSessionResponseMessage = Static<typeof JoinRaceSessionResponseMessageSchema>;

export const ClientOutboundMessageSchema = Type.Union([
  EnrichedGateEventMessageSchema,
  LapCompletedMessageSchema,
  JoinRaceSessionResponseMessageSchema,
  WsErrorCodeMessageSchema,
]);
export type ClientOutboundMessage = Static<typeof ClientOutboundMessageSchema>;