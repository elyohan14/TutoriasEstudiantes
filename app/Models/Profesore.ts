import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Profesore extends BaseModel {
  public static table = 'asignacion_asignatura'
  @column({ isPrimary: true })
  public id: number

  @column()
  public Cedula: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
