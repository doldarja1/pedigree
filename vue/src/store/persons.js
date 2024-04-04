import { genHash } from "@/services/common"

export const PERSONS = "persons"
export const CENTER = "center"

const initialState = [
  {
    id: '1',
    secondName: 'Иванов',
    firstName: 'Иван',
    patronymicName: 'Иванович',
    gender: 'male',
    military: [],
    children: ['2'],
    weddings: [],
    photo: require('@/assets/logo.png'),
  },
  {
    id: '2',
    secondName: 'Петров',
    firstName: 'Петр',
    patronymicName: 'Иванович',
    gender: 'male',
    weddings: []
  }
]

export default {
  namespaced: true,
  state: {
    persons: JSON.parse(localStorage.getItem(PERSONS)) || initialState,
    center: JSON.parse(localStorage.getItem(CENTER)) || '1'
  },
  getters: {
    getAllPersons: (state) => state.persons,
    getPersonById: (state) => (id) => state.persons.find((person) => person.id === id),
    filteredPersons: (state) => (filterFunction) => state.persons.filter(filterFunction),
    getAvailablePersons: (state) => state.persons.filter((person) => !person.removed),
    getPersonsByIds: (state) => (ids) => state.persons.filter(person => ids.includes(person.id)),
    getCenter: (state) => state.center
  },
  mutations: {
    addPerson: (state, payload) => {
      state.persons.push(payload)
      localStorage.setItem(PERSONS, JSON.stringify(state.persons))
    },
    deletePerson: (state, payload) => {
      console.log(payload)
      console.log(state.persons)
      state.persons = state.persons.filter((person) => {
        console.log(person)
        const isNotRemove = person.id !== payload

        if (isNotRemove) {
          if (person.weddings) {
            person.weddings = person.weddings.filter((wedding) => wedding.partnerId !== payload)
          }
          if (person.children) {
            person.children = person.children.filter((childId) => childId !== payload)
          }
        }

        return isNotRemove
      })
      console.log(state.persons)

      localStorage.setItem(PERSONS, JSON.stringify(state.persons))
    },
    editPerson: (state, payload) => {
      state.persons = state.persons.map((p) => (p.id === payload.id ? { ...p, ...payload } : p))
      localStorage.setItem(PERSONS, JSON.stringify(state.persons))
    },
    setCenter(state, id) {
      state.center = id
      localStorage.setItem(CENTER, JSON.stringify(id))
    },
    setPersons(state, payload) {
      state.persons = payload
      localStorage.setItem(PERSONS, JSON.stringify(state.persons))
    }
  },
  actions: {
    addPerson: ({ commit }, payload) => new Promise((resolve) => {
      const person = { ...payload, id: genHash() }
      commit("addPerson", person)
      return resolve(person)
    }),
    deletePerson: ({ commit }, payload) => new Promise((resolve) => {
      commit("deletePerson", payload)
      return resolve(payload)
    }),
    editPerson: ({ commit }, payload) => {
      commit("editPerson", payload)
    },
    setCenter({ commit }, id) {
      commit("setCenter", id)
    },
    setPersons: ({ commit }, payload) => {
      commit("setPersons", payload)
    }
  }
}
