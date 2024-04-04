<template>
  <div class="custom-form">
    <ElSelect
      v-model="partnerId"
      class="custom-form__full-width"
      type="textarea"
      placeholder="Выберите партнёра"
    >
      <ElOption
        v-for="person in persons"
        :key="person.id"
        :label="fullName(person)"
        :value="person.id"
      />
    </ElSelect>
    <ElDatePicker
      v-model="startDate"
      class="custom-form__input"
      type="date"
      format="dd.MM.yyyy"
      value-format="dd.MM.yyyy"
      placeholder="Дата свадьбы"
      :picker-options="startPickerOptions"
    />
    <ElDatePicker
      v-model="endDate"
      class="custom-form__input"
      type="date"
      format="dd.MM.yyyy"
      value-format="dd.MM.yyyy"
      placeholder="Дата развода"
      :picker-options="endPickerOptions"
    />
  </div>
</template>

<script>
import { formatPersonName } from '@/services/formatPersonName'
import { parseDateString } from '@/services/datePickerOptions'

export default {
  name: 'WeddingForm',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    persons: {
      type: Array,
      required: true
    }
  },
  computed: {
    partnerId: {
      get () {
        return this.value.partnerId
      },
      set (value) {
        this.emitFormData({ partnerId: value })
      }
    },
    startDate: {
      get () {
        return this.value.startDate
      },
      set (value) {
        this.emitFormData({ startDate: value })
      }
    },
    endDate: {
      get () {
        return this.value.endDate
      },
      set (value) {
        this.emitFormData({ endDate: value })
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
    emitFormData (param) {
      this.$emit('change', {
        ...this.value,
        ...param
      })
    },
    validate () {
      if (!this.partnerId) {
        return 'Необходимо выбрать партнёра.';
      }
      if (!this.startDate) {
        return 'Необходимо указать дату свадьбы.';
      }
      if (!this.endDate) {
        return 'Необходимо указать дату развода.';
      }
      return null;
      },
    fullName (partner) {
      if (partner) {
        return formatPersonName(partner, { short: false, access: this.needHide })
      }
      return ''
    }
  }
}
</script>

<style>
</style>
