import { Type, Static } from '@sinclair/typebox'

export const GateTriggerMessageSchema = Type.Object({
  type: Type.Literal('GATE_TRIGGER'),
  gate_id: Type.Integer(),
  ts: Type.Integer(),
  beam_x: Type.Integer(),
  beam_y: Type.Integer(),
})

export type GateTriggerMessage = Static<typeof GateTriggerMessageSchema>

export const GateInboundMessageSchema = Type.Union([GateTriggerMessageSchema])
export type GateInboundMessage = Static<typeof GateInboundMessageSchema>
