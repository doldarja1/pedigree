import { Person } from '@/types/person'

export function formatPersonName(person: Person, config: { access?: boolean; short?: boolean;} = {}): string {
  const { access, short } = config
  const parts = []
  const { secondName, firstName, patronymicName, maidenName } = person

  const maskFio = (str: string): string => {
    if (!str || str.length === 0) {
      return str
    }
    return str[0] + '.'
  }

  // Добавление фамилии
  if (secondName) {
    if (access && person.access) {
      parts.push(maskFio(secondName))
    } else {
      parts.push(secondName)
    }
  }

  // Добавление имени
  if (firstName) {
    if (access && person.access || short) {
      parts.push(maskFio(firstName))
    } else {
      parts.push(firstName)
    }
  }

  // Добавление отчества
  if (patronymicName) {
    if (access && person.access || short) {
      parts.push(maskFio(patronymicName))
    } else {
      parts.push(patronymicName)
    }
  }

  // Добавление девичьей фамилии, если присутствует
  if (maidenName) {
    if (access && person.access) {
      parts.push(maskFio(maidenName))
    } else {
      parts.push(`(${maidenName})`)
    }
  }

  if (parts.length == 0) {
    return '-'
  }
  return parts.join(' ')
}
