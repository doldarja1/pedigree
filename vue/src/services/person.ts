import { Person } from '@/types/person'
import { Education } from '@/types/person'
import { Wedding } from '@/types/person'
import { Work } from '@/types/person'
import { Military } from '@/types/person'

export const emptyPerson = (): Person => ({
  id: '', // id
  secondName: '', // Фамилия
  firstName: '', // Имя
  patronymicName: '', // Отчество
  maidenName: '', // Девичья фамилия
  birthDate: '', // Дата рождения
  dieDate: '', // Дата смерти
  gender: null, // Пол
  biography: '', // Биография
  activity: '', // Род деятельности
  photo: '', // Ссылка на фото
  children: [], // Массив id детей
  educations: [], // Образования
  weddings: [], // Брачные союзы
  works: [], // Работы
  militaries: [], // Служба,
  access: null,
  removed: null
})

export const emptyWedding = (): Wedding => ({
  partnerId: '',
  startDate: '',
  endDate: ''
})

export const emptyWork = (): Work => ({
  place: '',
  organization: '',
  startDate: '',
  endDate: '',
  position: '',
  description: ''
})

export const emptyMilitary = (): Military => ({
  type: '',
  rank: '',
  startDate: '',
  endDate: '',
  description: ''
})

export const emptyEducation = (): Education => ({
  type: '',
  level: '',
  startDate: '',
  endDate: '',
  name: '',
  city: ''
})
