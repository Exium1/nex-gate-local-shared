import { Type, Static } from '@sinclair/typebox'

export const WsErrorCode = {
  INVALID_JSON: 'INVALID_JSON',
  UNKNOWN_TYPE: 'UNKNOWN_TYPE',
  UNAUTHORIZED: 'UNAUTHORIZED',
  ROLE_TAKEN: 'ROLE_TAKEN',
  RACE_NOT_ACTIVE: 'RACE_NOT_ACTIVE',
} as const

export const WsErrorCodeSchema = Type.Union(
  Object.values(WsErrorCode).map((v) => Type.Literal(v)),
)

export const WsErrorCodeMessageSchema = Type.Object({
  type: Type.Literal("ERROR"),
  code: WsErrorCodeSchema,
  message: Type.String(),
})
export type WsErrorCodeMessage = Static<typeof WsErrorCodeMessageSchema>;

export type WsErrorCode = Static<typeof WsErrorCodeSchema>