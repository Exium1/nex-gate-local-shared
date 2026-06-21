import { Static, Type } from "@sinclair/typebox";
import { RoleSchema } from "../common.schema.js";

export const JoinRaceSessionRequestSchema = Type.Object({
  role: RoleSchema,
})
export type JoinRaceSessionRequest = Static<typeof JoinRaceSessionRequestSchema>;

export const JoinRaceSessionRequestMessageSchema = Type.Object({
  type: Type.Literal("JOIN"),
  requestId: Type.Integer(),
  payload: JoinRaceSessionRequestSchema,
})
export type JoinRaceSessionRequestMessage = Static<typeof JoinRaceSessionRequestMessageSchema>;

export const ClientInboundMessageSchema = Type.Union([JoinRaceSessionRequestMessageSchema]);
export type ClientInboundMessage = Static<typeof ClientInboundMessageSchema>;