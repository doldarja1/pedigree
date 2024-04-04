<template>
  <PageLayout>
    <div class="person-container">
      <ElInput
        v-model="search"
        class="custom-form__input"
        placeholder="Поиск"
        clearable
      />
      <ElSelect
        v-model="filterRemovedData"
        class="custom-form__input"
        placeholder="Показать всех">
        <ElOption
          label="Показать всех"
          value=false
        />
        <ElOption
          label="Показать доступных"
          value=true
        />
      </ElSelect>
      <div
        v-if="persons && persons.length > 0"
        class="person-container__wrapper"
      >
        <RouterLink
          class="navigation-panel__link__wrapper"
          :to="{ name: $routes.PERSON, params: { id: person.id } }"
          v-for="(person, id) in persons"
          :key="id"
        >
          <WidePersonCard :person="person" />
        </RouterLink>
      </div>
      <div v-else>
        Список пуст
      </div>
    </div>
  </PageLayout>
</template>

<script>
import { mapGetters } from 'vuex'
import PageLayout from '../parts/PageLayout.vue'
import WidePersonCard from '../cards/WidePersonCard.vue'

export default {
  name: 'PersonList',
  components: {
    PageLayout,
    WidePersonCard
  },
  data () {
    return {
      search: '',
      filterRemoved: false
    }
  },
  computed: {
    ...mapGetters('persons', [
      'getAllPersons',
      'filteredPersons'
    ]),
    filterRemovedData: {
      get () {
        return this.filterRemoved.toString()
      },
      set (value) {
        this.filterRemoved = value == true
      }
    },
    fields () {
      return ['id', 'firstName', 'secondName', 'patronymicName', 'birthDate']
    },
    persons () {
      return this
        .filteredPersons((person) => {
            return !this.filterRemoved || !person.removed
        })
        .filter(this.searchFunc)
    },
  },
  methods: {
    searchFunc (person) {
      if (this.search.length < 3){
        return true
      }
      return this.fields.some((field) => {
        if (person[field]) {
          return person[field].toString().toLowerCase().includes(this.search.toLowerCase())
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.person-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 30px;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}
</style>
