<template>
  <div class="custom-form">
    <ElInput
      v-model="secondName"
      class="custom-form__input"
      type="text"
      placeholder="Фамилия"
    />
    <ElInput
      v-model="firstName"
      class="custom-form__input"
      type="text"
      placeholder="Имя"
    />
    <ElInput
      v-model="patronymicName"
      class="custom-form__input"
      type="text"
      placeholder="Отчество"
    />
    <ElInput
      v-model="gender"
      class="custom-form__input"
      type="text"
      placeholder="Пол"
    />
    <ElInput
      v-model="maidenName"
      v-if="gender === 'female'"
      class="custom-form__full-width"
      type="text"
      placeholder="Девичья фамилия"
    />
    <ElDatePicker
      v-model="birthDate"
      class="custom-form__input"
      type="date"
      format="dd.MM.yyyy"
      value-format="dd.MM.yyyy"
      placeholder="Дата рождения"
      :picker-options="birthPickerOptions"
    />
    <ElDatePicker
      v-model="dieDate"
      class="custom-form__input"
      type="date"
      format="dd.MM.yyyy"
      value-format="dd.MM.yyyy"
      placeholder="Дата смерти"
      :picker-options="diePickerOptions"
    />
    <div class="custom-form__full-width">
      <ElInput
        v-model="activity"
        class="custom-form__input"
        type="textarea"
        placeholder="Род деятельности"
      />
    </div>
    <div class="custom-form__full-width">
      <ElInput
        v-model="biography"
        class="custom-form__input"
        type="textarea"
        placeholder="Биография"
      />
    </div>
    <ElSelect
      v-model="access"
      class="custom-form__input"
      placeholder="Скрывание">
      <ElOption
        label="Скрывать"
        value=true
      />
      <ElOption
        label="Не скрывать"
        value=false
      />
    </ElSelect>
    <ElSelect
      v-model="removed"
      class="custom-form__input"
      placeholder="Удалить">
      <ElOption
        label="Удалён"
        value="true"
      />
      <ElOption
        label="Виден"
        value="false"
      />
    </ElSelect>


    <div class="custom-form__full-width">
      <h2>Дети</h2>
      <div
        v-for="(child, index) in value.children"
        :key="'child' + index"
      >
        <div class="person-page__header-wrapper">
          <h3>Ребенок {{ index + 1 }}</h3>
          <div class="person-page__buttons-wrapper">
            <button
              v-show="index !== 0"
              class="person-page__button" 
              @click="() => moveItem('children', index, 'up')" 
            >
              ⬆
            </button>
            <button
              v-show="index !== value.children.length - 1"
              class="person-page__button" 
              @click="() => moveItem('children', index, 'down')" 
            >
              ⬇
            </button>
            <button class="person-page__button" @click="() => removeChildForm(index)">
              ✖
            </button>
          </div>
        </div>
        <ChildForm
          ref="childForm"
          :value="child"
          :persons="childrens"
          @change="(child) => setChildForm(child, index)"
        />
      </div>
      <div class="custom-form__full-width person-page__right-wrapper">
        <SimpleButton type="primary" @click="() => addChildForm()">
          Добавить
        </SimpleButton>
      </div>
    </div>

    <div class="custom-form__full-width">
      <h2>Брачные союзы</h2>
      <div
        v-for="(wedding, index) in value.weddings"
        :key="'wedding' + index"
      >
        <div class="person-page__header-wrapper">
          <h3>Свадьба {{ index + 1 }}</h3>
          <div class="person-page__buttons-wrapper">
            <button 
              v-show="index !== 0"
              class="person-page__button" 
              @click="() => moveItem('weddings', index, 'up')" 
            >
              ⬆
            </button>
            <button 
              v-show="index !== value.weddings.length - 1"
              class="person-page__button" 
              @click="() => moveItem('weddings', index, 'down')" 
            >
              ⬇
            </button>
            <button class="person-page__button" @click="() => removeWeddingForm(index)">
              ✖
            </button>
          </div>
        </div>
        <WeddingForm
          ref="weddingForm"
          :value="wedding"
          :persons="partners"
          @change="(wedding) => setWeddingForm(wedding, index)"
        />
      </div>
      <div class="custom-form__full-width person-page__right-wrapper">
        <SimpleButton @click="() => addWeddingForm()" type="primary">
          Добавить
        </SimpleButton>
      </div>
    </div>

    <div class="custom-form__full-width">
      <h2>Военная служба</h2>
      <div
        v-for="(military, index) in value.militaries"
        :key="'military' + index"
      >
        <div class="person-page__header-wrapper">
          <h3>Военная служба {{ index + 1 }}</h3>
          <div class="person-page__buttons-wrapper">
            <button 
              v-show="index !== 0"
              class="person-page__button" 
              @click="() => moveItem('militaries', index, 'up')"
            >
              ⬆
            </button>
            <button 
              v-show="index !== value.militaries.length - 1"
              class="person-page__button" 
              @click="() => moveItem('militaries', index, 'down')" 
            >
              ⬇
            </button>
            <button class="person-page__button" @click="() => removeMilitaryForm(index)">
              ✖
            </button>
          </div>
        </div>
        <MilitaryForm
          ref="militaryForm"
          :value="military"
          @change="(military) => setMilitaryForm(military, index)"
        />
      </div>
      <div class="custom-form__full-width person-page__right-wrapper">
        <SimpleButton type="primary" @click="() => addMilitaryForm()">
          Добавить
        </SimpleButton>
      </div>
    </div>

    <div class="custom-form__full-width">
      <h2>Образование</h2>
      <div
        v-for="(education, index) in value.educations"
        :key="'education' + index"
      >
        <div class="person-page__header-wrapper">
          <h3>Образование {{ index + 1 }}</h3>
          <div class="person-page__buttons-wrapper">
            <button 
              v-show="index !== 0"
              class="person-page__button" 
              @click="() => moveItem('educations', index, 'up')" 
            >
              ⬆
            </button>
            <button 
              v-show="index !== value.educations.length - 1"
              class="person-page__button" 
              @click="() => moveItem('educations', index, 'down')" 
            >
              ⬇
            </button>
            <button @click="() => removeEducationForm(index)" class="person-page__button">
              ✖
            </button>
          </div>
        </div>
        <EducationForm
          ref="educationForm"
          :value="education"
          @change="(education) => setEducationForm(education, index)"
        />
      </div>
      <div class="custom-form__full-width person-page__right-wrapper">
        <SimpleButton type="primary" @click="() => addEducationForm()">
          Добавить
        </SimpleButton>
      </div>
    </div>

    <div class="custom-form__full-width">
      <h2>Работа</h2>
      <div
        v-for="(work, index) in value.works"
        :key="'work' + index"
      >
        <div class="person-page__header-wrapper">
          <h3>Работа {{ index + 1 }}</h3>
          <div class="person-page__buttons-wrapper">
            <button 
              v-show="index !== 0"
              class="person-page__button" 
              @click="() => moveItem('works', index, 'up')" 
            >
              ⬆
            </button>
            <button 
              v-show="index !== value.works.length - 1"
              class="person-page__button" 
              @click="() =>  moveItem('works', index, 'down')" 
            >
              ⬇
            </button>
            <button @click="() => removeWorkForm(index)" class="person-page__button">
              ✖
            </button>
          </div>
        </div>
        <WorkForm
          ref="workForm"
          :value="work"
          @change="(work) => setWorkForm(work, index)"
        />
      </div>
      <div class="custom-form__full-width person-page__right-wrapper">
        <SimpleButton type="primary" @click="() => addWorkForm()">
          Добавить
        </SimpleButton>
      </div>
    </div>
  </div>
</template>

<script>
import MilitaryForm from '@/components/forms/MilitaryForm.vue'
import SimpleButton from '@/components/ui/SimpleButton.vue'
import WeddingForm from '@/components/forms/WeddingForm.vue'
import ChildForm from '@/components/forms/ChildForm.vue'
import { mapGetters } from 'vuex'
import EducationForm from '@/components/forms/EducationForm.vue'
import WorkForm from '@/components/forms/WorkForm.vue'
import { emptyWedding, emptyWork, emptyMilitary, emptyEducation } from '@/services/person'
import { parseDateString } from '@/services/datePickerOptions'

export default {
  name: 'PersonForm',
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    WorkForm,
    EducationForm,
    WeddingForm,
    ChildForm,
    MilitaryForm,
    SimpleButton
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('persons', [
      'filteredPersons',
      'getAllPersons',
      'getPersonById',
      'getCenter'
    ]),
    secondName: {
      get () {
        return this.value.secondName
      },
      set (value) {
        this.emitFormData({ secondName: value })
      }
    },
    firstName: {
      get () {
        return this.value.firstName
      },
      set (value) {
        this.emitFormData({ firstName: value })
      }
    },
    patronymicName: {
      get () {
        return this.value.patronymicName
      },
      set (value) {
        this.emitFormData({ patronymicName: value })
      }
    },
    maidenName: {
      get () {
        return this.value.maidenName;
      },
      set (value) {
        this.emitFormData({ maidenName: value });
      }
    },
    gender: {
      get () {
        return this.value.gender
      },
      set (value) {
        this.emitFormData({ gender: value })
      }
    },
    birthDate: {
      get () {
        return this.value.birthDate
      },
      set (value) {
        this.emitFormData({ birthDate: value })
      }
    },
    dieDate: {
      get () {
        return this.value.dieDate
      },
      set (value) {
        this.emitFormData({ dieDate: value })
      }
    },
    activity: {
      get () {
        return this.value.activity
      },
      set (value) {
        this.emitFormData({ activity: value })
      }
    },
    biography: {
      get () {
        return this.value.biography
      },
      set (value) {
        this.emitFormData({ biography: value })
      }
    },
    access: {
      get () {
        return this.value.access && this.value.access.toString()
      },
      set (value) {
        this.emitFormData({
          access: value === 'true'
        })
      },
    },
    removed: {
      get () {
        return this.value.removed && this.value.removed.toString()
      },
      set (value) {
        this.emitFormData({
          removed: value === 'true'
        })
      },
    },
    id () {
      return this.$route.params.id
    },
    person () {
      return this.getPersonById(this.id)
    },
    partners () {
      const customFilter = (person) => {
        const partnerBirthDate = this.formatDate(person.birthDate)
        const partnerDeathDate = this.formatDate(person.dieDate)
        const deathDate = this.formatDate(this.value.dieDate)
        const birthDate = this.formatDate(this.value.birthDate)
        return (
          this.value.gender !== person.gender &&
          (!this.value.dieDate || !person.birthDate || deathDate > partnerBirthDate) &&
          (!this.value.birthDate || !person.dieDate || birthDate < partnerDeathDate)
        )
      }
      return this.filteredPersons(customFilter) || []
    },
    childrens () {
      const customFilter = (person) => {
        const childBirthDate = this.formatDate(person.birthDate)
        const childDeathDate = this.formatDate(person.dieDate)
        const deathDate = this.formatDate(this.value.dieDate)
        const birthDate = this.formatDate(this.value.birthDate)
        return (
          birthDate > childBirthDate &&
          (!this.value.dieDate || !person.birthDate || deathDate > childBirthDate) &&
          (!this.value.birthDate || !person.dieDate || birthDate < childDeathDate)
        )
      }
      return this.filteredPersons(customFilter) || []
    },
    birthPickerOptions () {
      return {
        disabledDate: time => {
          if (this.dieDate) {
            const dieDate = this.parseDateString(this.dieDate)
            return dieDate && time.getTime() > dieDate.getTime()
          }
        }
      }
    },
    diePickerOptions () {
      return {
        disabledDate: time => {
          if (this.birthDate) {
            const birthDate = this.parseDateString(this.birthDate)
            return birthDate && time.getTime() < birthDate.getTime()
          }
        }
      }
    }
  },
  methods: {
    parseDateString,
    emitFormData (param) {
      this.$emit('change', {
        ...this.value,
        ...param
      })
    },
    checkEmptyForms() {
      const forms = [
        ...this.$refs.militaryForm,
        ...this.$refs.educationForm,
        ...this.$refs.childForm,
        ...this.$refs.weddingForm,
        ...this.$refs.workForm
      ]
      forms.forEach(i => {
        const r = i.validate()
        if (r) {
          console.error('Ошибка в форме:', i);
        }
      })
    },   
    formatDate (date) {
      if (date) {
        const getYear = parseInt(date.slice(6, 10))
        const getMonth = parseInt(date.slice(3, 5))
        const getDay = parseInt(date.slice(0, 2))
        return new Date(getYear, getMonth, getDay)
      }
      return null
    },

    setMilitaryForm (updatedMilitary, index) {
      const newValue = { ...this.value }
      newValue.militaries[index] = updatedMilitary
      newValue.militaries = [...newValue.militaries]
      this.$emit('change', newValue)
    },
    addMilitaryForm () {
      const newValue = { ...this.value }
      newValue.militaries.push(emptyMilitary())
      this.$emit('change', newValue)
    },
    removeMilitaryForm (index) {
      const newValue = { ...this.value }
      newValue.militaries.splice(index, 1)
      this.$emit('change', newValue)
    },

    setWeddingForm (updatedWedding, index) {
      const newValue = { ...this.value }
      newValue.weddings = [...newValue.weddings]
      newValue.weddings[index] = updatedWedding
      this.$emit('change', newValue)
    },
    addWeddingForm () {
      const newValue = { ...this.value }
      newValue.weddings.push(emptyWedding())
      this.$emit('change', newValue)
    },
    removeWeddingForm (index) {
      const newValue = { ...this.value }
      newValue.weddings.splice(index, 1)
      this.$emit('change', newValue)
    },

    setChildForm (updatedChild, index) {
      const newValue = { ...this.value }
      newValue.children = [...newValue.children]
      newValue.children[index] = updatedChild
      this.$emit('change', newValue)
    },
    addChildForm () {
      const newValue = { ...this.value }
      newValue.children.push({ child: '' })
      this.$emit('change', newValue)
    },
    removeChildForm (index) {
      const newValue = { ...this.value }
      newValue.children.splice(index, 1)
      this.$emit('change', newValue)
    },

    setEducationForm (updatedEducation, index) {
      const newValue = { ...this.value }
      newValue.educations = [...newValue.educations]
      newValue.educations[index] = updatedEducation
      this.$emit('change', newValue)
    },
    addEducationForm () {
      const newValue = { ...this.value }
      newValue.educations.push(emptyEducation())
      this.$emit('change', newValue)
    },
    removeEducationForm (index) {
      const newValue = { ...this.value }
      newValue.educations.splice(index, 1)
      this.$emit('change', newValue)
    },

    setWorkForm (updatedWork, index) {
      const newValue = { ...this.value }
      newValue.works = [...newValue.works]
      newValue.works[index] = updatedWork
      this.$emit('change', newValue)
    },
    addWorkForm () {
      const newValue = { ...this.value }
      newValue.works.push(emptyWork())
      this.$emit('change', newValue)
    },
    removeWorkForm (index) {
      const newValue = { ...this.value }
      newValue.works.splice(index, 1)
      this.$emit('change', newValue)
    },
    moveItem(valueName, index, direction) {
      const newValue = [...this.value[valueName]]
      const temp = newValue[index]
      if (direction === 'up') {
        newValue[index] = newValue[index - 1]
        newValue[index - 1] = temp
      } else if (direction === 'down') {
        newValue[index] = newValue[index + 1]
        newValue[index + 1] = temp
      }
      this.$emit('change', { ...this.value, [valueName]: newValue })
    }
  }
}
</script>

<style scoped lang="less">
.person-page {
  &__button {
    background: none;
    border: none;
    cursor: pointer;
  }

  &__header-wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__right-wrapper {
    text-align: right;
  }

  &__buttons-wrapper {
    display: flex;
    align-items: center;
  }
}
</style>
