import { Type, Static } from '@sinclair/typebox'
import { GateEventSchema } from '../http/gate-event.schema.js'
import { Nullable } from '../common.schema.js';
import { CompletedLapSchema } from '../http/lap.schema.js';

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

export const ClientOutboundMessageSchema = Type.Union([EnrichedGateEventSchema, CompletedLapSchema]);
export type ClientoutBoundMessage = Static<typeof ClientOutboundMessageSchema>;