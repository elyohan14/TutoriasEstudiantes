import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DatosPersonale from 'App/Models/DatosPersonale'
import HistEspecialidad from 'App/Models/HistEspecialidad'
import Profesore from 'App/Models/Profesore'
import TutoriasEstudiante from 'App/Models/TutoriasEstudiante'

export default class DatosPersonalesController {
  public async index ({}: HttpContextContract) {
  }

  public async create ({}: HttpContextContract) {
  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
  public async setTutor ({ response }: HttpContextContract) {
    const estudiantes = await HistEspecialidad.query().whereIn('estatus', [2, 5])
    const estudiantesJSON = estudiantes.map((post) => post.serialize().cedula)

    const profesores = await Profesore.query().select('Cedula').groupBy('Cedula')
    const profesoresJSON = profesores.map((post) => post.serialize().cedula)
    console.log('Estudiantes:', estudiantesJSON.length)
    console.log('Profesores:', profesoresJSON.length)

    let inserciones = 0
    const maxAlumnosXProfesor = Math.ceil(estudiantesJSON.length / profesoresJSON.length)
    console.log({ maxAlumnosXProfesor })

    for (const cedulaEstudiante of estudiantesJSON) {
      // console.log({ cedulaEstudiante })
      // Preguntar si tiene tutor
      const tieneTutor = await TutoriasEstudiante.query().where('cedula_estudiante', cedulaEstudiante).first()

      if (!tieneTutor) {
        for (const cedulaTutor of profesoresJSON) {
          const cantidadAlumnos = await TutoriasEstudiante.query().where('cedula_tutor', cedulaTutor)
          const cantidadAlumnosJSON = cantidadAlumnos.map((post) => post.serialize())

          if (cantidadAlumnosJSON.length < maxAlumnosXProfesor) {
            inserciones++
            console.log('tutor', cedulaTutor)
            await TutoriasEstudiante.create({
              cedula_estudiante: cedulaEstudiante,
              cedula_tutor: cedulaTutor,
            })
            break
          }
        }
      }
    }
    console.log({ inserciones })
    response.send(estudiantesJSON)
  }
}
