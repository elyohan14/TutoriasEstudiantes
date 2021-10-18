import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TutoriasEstudiante extends BaseModel {
  public static table = 'tutorias_estudiantes'
  @column({ isPrimary: true })
  public id: number

  @column()
  public cedula_estudiante: string

  @column()
  public cedula_tutor: string
}
