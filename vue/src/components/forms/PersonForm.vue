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
    <ElDatePicker
      v-model="birthDate"
      class="custom-form__input"
      type="date"
      format="dd.MM.yyyy"
      value-format="dd.MM.yyyy"
      placeholder="Дата рождения"
    />
    <ElDatePicker
      v-model="dieDate"
      class="custom-form__input"
      type="date"
      format="dd.MM.yyyy"
      value-format="dd.MM.yyyy"
      placeholder="Дата смерти"
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
    <div class="custom-form__full-width">
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
    </div>
    <h2>Военная служба</h2>
    <div 
      class="custom-form__full-width" 
      v-for="(military, index) in value.militaries" 
      :key="index"
    >
      <div class ="person-page__header-wrapper">
      <h3>Военная служба {{index + 1}}</h3>
        <button class="person-page__btn-close" @click="() => removeMilitaryForm(index)">
          ✖
        </button>
      </div>
      <MilitaryForm
        ref="militaryForm"
        :value="military"
        class="custom-form__input"
        @change="(military) => setMilitaryForm(military, index)"
      />
    </div>
    <div class ="custom-form__full-width person-page__right-wrapper">
      <SimpleButton type="primary" @click="() => addMilitaryForm()">
        Добавить
      </SimpleButton >
    </div>
    <h2>Брачные союзы</h2>
    <div 
      class="custom-form__full-width" 
      v-for="(wedding, index) in value.weddings" 
      :key="index"
    >
      <div class ="person-page__header-wrapper">
      <h2>Свадьба {{index + 1}}</h2>
        <button @click="() => removeWeddingForm(index)" class="person-page__btn-close ">
          ✖
        </button>
      </div>
      <WeddingForm
        ref="weddingForm"
        :value="wedding" :persons="partners"
        class="custom-form__input"
        @change="(wedding) => setWeddingForm(wedding, index)"
      />
    </div>
    <div class ="custom-form__full-width person-page__right-wrapper">
      <SimpleButton @click="() => addWeddingForm()" type="primary">
        Добавить 
      </SimpleButton >
    </div>
    <h2>Образование</h2>
    <div 
      class="custom-form__full-width" 
      v-for="(education, index) in value.educations" 
      :key="index"
    >
      <div class ="person-page__header-wrapper">
      <h2>Образование {{index + 1}}</h2>
        <button @click="() => removeEducationForm(index)" class="person-page__btn-close ">
          ✖
        </button>
      </div>
      <EducationForm
        ref="educationForm"
        :value="education"
        class="custom-form__input"
        @change="(education) => setEducationForm(education, index)"
      />
    </div>
    <div class ="custom-form__full-width person-page__right-wrapper">
      <SimpleButton @click="() => addEducationForm()" type="primary">
        Добавить 
      </SimpleButton >
    </div>
    <h2>Работа</h2>
    <div 
      class="custom-form__full-width" 
      v-for="(work, index) in value.works" 
      :key="index"
    >
      <div class ="person-page__header-wrapper">
      <h2>Работа {{index + 1}}</h2>
        <button @click="() => removeWorkForm(index)" class="person-page__btn-close ">
          ✖
        </button>
      </div>
      <WorkForm
        ref="workForm"
        :value="work"
        class="custom-form__input"
        @change="(work) => setWorkForm(work, index)"
      />
    </div>
    <div class ="custom-form__full-width person-page__right-wrapper">
      <SimpleButton @click="() => addWorkForm()" type="primary">
        Добавить
      </SimpleButton >
    </div>
    <h2>Дети</h2>
    <div 
      class="custom-form__full-width" 
      v-for="(child, index) in value.children" 
      :key="index"
    >
      <div class ="person-page__header-wrapper">
      <h2>Ребёнок {{index + 1}}</h2>
        <button @click="() => removeChildForm(index)" class="person-page__btn-close ">
          ✖
        </button>
      </div>
      <ChildForm
        ref="childForm"
        :value="child" :persons="children"
        class="custom-form__input"
        @change="(child) => setChildForm(child, index)"
      />
    </div>
    <div class ="custom-form__full-width person-page__right-wrapper">
      <SimpleButton @click="() => addChildForm()" type="primary">
        Добавить 
      </SimpleButton >
    </div>
  </div>
</template>

<script>
import MilitaryForm from '../forms/MilitaryForm.vue'
import SimpleButton from '../ui/SimpleButton.vue'
import WeddingForm from '../forms/WeddingForm.vue'
import ChildForm from '../forms/ChildForm.vue'
import { mapGetters } from 'vuex'
import EducationForm from '../forms/EducationForm.vue'
import WorkForm from '../forms/WorkForm.vue'
import { emptyWedding } from '@/services/person'
import { emptyMilitary } from '@/services/person'
import { emptyEducation } from '@/services/person'
import { emptyWork } from '@/services/person'

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
      get(){
        if (this.value.access){
          return 'true'
        }
        else {
          return 'false'
        }
      },
      set(value){
        if (value == 'true'){
          value = true
        }
        else {
          value = false
        }
        this.emitFormData({
          access: value
        })
      }
    },
    
    ...mapGetters('persons', [
      'filteredPersons',
      'getAllPersons',
      'getPersonById',
      'getCenter'
    ]),
    id () {
      return this.$route.params.id
    },
    person () {
      return this.getPersonById(this.id)
    },
    partners() {
      const customFilter = (person) => {
        const partnerGender = this.person.gender === 'male' ? 'female' : 'male'
        const birthDate = new Date(this.person.birthDate)
        const deathDate = new Date(this.person.dieDate)
        return (
          person.gender !== partnerGender &&
          (!person.dieDate || new Date(person.dieDate) >birthDate) &&
          (!person.birthDate|| new Date(person.birthDate) < deathDate)
        )
      }
      return this.filteredPersons(customFilter) || []
    },
    children() {
      const customFilter = (person) => {
        const birthDate = new Date(this.person.birthDate)
        const deathDate = new Date(this.person.dieDate)
        return (
          person.birthDate > this.person.birthDate &&
          (!person.dieDate || new Date(person.dieDate) >birthDate) &&
          (!person.birthDate|| new Date(person.birthDate) < deathDate)
        )
      }
      return this.filteredPersons(customFilter) || []
    }
  },
  methods: {
    emitFormData (param) {
      this.$emit('change', {
        ...this.value,
        ...param
      })
    },
    checkEmptyForms() {
      const forms = [
        { ref: this.$refs.militaryForm, name: "Служба", validate: "validateMil" },
        { ref: this.$refs.educationForm, name: "Образование", validate: "validateEdu" },
        { ref: this.$refs.weddingForm, name: "Свадьба", validate: "validateWed" },
        { ref: this.$refs.wedForm, name: "Работа", validate: "validateWork" },
        { ref: this.$refs.childForm, name: "Дети", validate: "validateChild" }
      ];
      const emptyForms = [];
      forms.forEach((form) => {
        if (form.ref) {
          form.ref.forEach((i) => {
            if (i[form.validate]) {
              i[form.validate]();
              if (!i.value) {
                emptyForms.push(form.name);
              }
            }
          });
        }
      });
      if (emptyForms.length > 0) {
        const errorMessage = `Следующие формы пустые: ${emptyForms.join(', ')}`;
        console.log(errorMessage);
      } 
    },   
    setMilitaryForm(updatedMilitary, index) {
      const newValue = { ...this.value }
      newValue.militaries[index] = updatedMilitary
      newValue.militaries = [...newValue.militaries]
      this.$emit('change', newValue)
    },
    addMilitaryForm() {
      const newValue = { ...this.value }
      newValue.militaries.push(emptyMilitary)
      this.$emit('change', newValue)
    },
    removeMilitaryForm(index) {
      const newValue = { ...this.value }
      newValue.militaries.splice(index, 1)
      this.$emit('change', newValue)
    },
    setWeddingForm(updatedWedding, index) {
      const newValue = { ...this.value }
      newValue.weddings = [...newValue.weddings]
      newValue.weddings[index] = updatedWedding
      this.$emit('change', newValue)
    },
    addWeddingForm() {
      const newValue = { ...this.value }
      newValue.weddings.push(emptyWedding)
      this.$emit('change', newValue)
    },
    removeWeddingForm(index) {
      const newValue = { ...this.value }
      newValue.weddings.splice(index, 1)
      this.$emit('change', newValue)
    },
    setChildForm(updatedChild, index) {
      const newValue = { ...this.value }
      newValue.children = [...newValue.children]
      newValue.children[index] = updatedChild
      this.$emit('change', newValue)
    },
    addChildForm() {
      const newValue = { ...this.value }
      newValue.children.push({
        child: ''
      })
      this.$emit('change', newValue)
    },
    removeChildForm(index) {
      const newValue = { ...this.value }
      newValue.children.splice(index, 1)
      this.$emit('change', newValue)
    },
    
    setEducationForm(updatedEducation, index) {
      const newValue = { ...this.value }
      newValue.educations = [...newValue.educations]
      newValue.educations[index] = updatedEducation
      this.$emit('change', newValue)
    },
    addEducationForm() {
      const newValue = { ...this.value }
      newValue.educations.push(emptyEducation)
      this.$emit('change', newValue)
    },
    removeEducationForm(index) {
      const newValue = { ...this.value }
      newValue.educations.splice(index, 1)
      this.$emit('change', newValue)
    },

    setWorkForm(updatedWork, index) {
      const newValue = { ...this.value }
      newValue.works = [...newValue.works]
      newValue.works[index] = updatedWork
      this.$emit('change', newValue)
    },
    addWorkForm() {
      const newValue = { ...this.value }
      newValue.works.push(emptyWork)
      this.$emit('change', newValue)
    },
    removeWorkForm(index) {
      const newValue = { ...this.value }
      newValue.works.splice(index, 1)
      this.$emit('change', newValue)
    }
  }
}
</script>

<style scoped lang="less">
@media (max-width: 720px) {
  .custom-form {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
} 

.person-page {
  &__btn {
    justify-self: center;
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    background-color: aqua;
    color: black;
    font-weight: 600;
    cursor: pointer;
    margin-left: 0px;
    margin-bottom: 20px;
  }

  &__btn-close {
    background: none;
    border: none;
    cursor: pointer;
  }

  &__header-wrapper {
    display: grid;
    grid-template-columns: auto max-content;
  }

  &__right-wrapper {
    text-align: right;
  }
}
</style>
 