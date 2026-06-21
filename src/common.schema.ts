import { Type, Static, TSchema, FormatRegistry } from "@sinclair/typebox"
import { validate as isUuid } from 'uuid'

FormatRegistry.Set('uuid', isUuid)

export const UUIDField = Type.String({ format: 'uuid' });

export const IdParam = Type.Object({ id: UUIDField })
export type IdParam = Static<typeof IdParam>

export const Role = {
  DIRECTOR: 'director',
  SPECTATOR: 'spectator'
} as const

export const RoleSchema = Type.Union(
  Object.values(Role).map((v) => Type.Literal(v)),
)
export type Role = Static<typeof RoleSchema>;

export const Nullable = <T extends TSchema>(schema: T) => 
  Type.Union([schema, Type.Null()])
