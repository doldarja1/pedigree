<template>
  <div class="custom-form">
    <ElInput
      v-model="place"
      class="custom-form__input"
      type="text"
      placeholder="Страна, город"
    />
    <ElInput
      v-model="organization"
      class="custom-form__input"
      type="text"
      placeholder="Организация"
    />
    <ElDatePicker
      v-model="startDate"
      class="custom-form__input"
      type="date"
      format="dd.MM.yyyy"
      value-format="dd.MM.yyyy"
      placeholder="Дата начала"
      :picker-options="startPickerOptions"
    />
    <ElDatePicker
      v-model="endDate"
      class="custom-form__input"
      type="date"
      format="dd.MM.yyyy"
      value-format="dd.MM.yyyy"
      placeholder="Дата завершения"
      :picker-options="endPickerOptions"
    />
    <div class="custom-form__full-width">
      <ElInput
        v-model="position"
        class="custom-form__input"
        type="text"
        placeholder="Должность"
      />
     </div>
     <div class="custom-form__full-width">
      <ElInput
        v-model="description"
        class="custom-form__input"
        type="textarea"
        placeholder="Описание"
      />
    </div>
  </div>
</template>

<script>
import { parseDateString } from '@/services/datePickerOptions'

export default {
  name: 'WorkForm',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    place: {
      get() {
        return this.value.place
      },
      set(value) {
        this.emitChange({ place: value })
      }
    },
    organization: {
      get() {
        return this.value.organization
      },
      set(value) {
        this.emitChange({ organization: value })
      }
    },
    startDate: {
      get() {
        return this.value.startDate
      },
      set(value) {
        this.emitChange({ startDate: value })
      }
    },
    endDate: {
      get() {
        return this.value.endDate
      },
      set(value) {
        this.emitChange({ endDate: value })
      }
    },
    position: {
      get() {
        return this.value.position
      },
      set(value) {
        this.emitChange({ position: value })
      }
    },
    description: {
      get() {
        return this.value.description
      },
      set(value) {
        this.emitChange({ description: value })
      }
    },
    startPickerOptions () {
      return {
        disabledDate: time => {
          if (this.endDate) {
            const endDate = this.parseDateString(this.endDate)
            return endDate && time.getTime() > endDate.getTime()
          }
        }
      }
    },
    endPickerOptions () {
      return {
        disabledDate: time => {
          if (this.startDate) {
            const startDate = this.parseDateString(this.startDate)
            return startDate && time.getTime() < startDate.getTime()
          }
        }
      }
    }
  },
  methods: {
    parseDateString,
    emitChange (param) {
      this.$emit('change', {
        ...this.value,
        ...param
      })
    },
    validate () {
      if (!this.place) {
        return 'Необходимо указать страну, город.';
      }
      if (!this.organization) {
        return 'Необходимо указать организацию.';
      }
      if (!this.startDate) {
        return 'Необходимо указать дату начала работы.';
      }
      if (!this.endDate) {
        return 'Необходимо указать дату завершения работы.';
      }
      if (!this.position) {
        return 'Необходимо указать должность.';
      }
      if (!this.description) {
        return 'Необходимо указать описание.';
      }
      return null;
    }
  }
}
</script>

<style>
</style>
