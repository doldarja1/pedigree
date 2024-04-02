<template>
  <div class="custom-form">
    <ElSelect
      v-model="child"
      class="custom-form__full-width"
      type="textarea"
      placeholder="Выберите ребенка"
    >
      <ElOption
        v-for="person in persons"
        :key="person.id"
        :label="person.secondName"
        :value="person.id"
      />
    </ElSelect>
  </div>
</template>

<script>
export default {
  name: 'ChildForm',
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
    child: {
      get () {
        return this.value.child
      },
      set (value) {
        this.emitFormData({ child: value })
      }
    }
  },
  methods: {
    emitFormData (param) {
      this.$emit('change', {
        ...this.value,
        ...param
      })
    },
    validate () {
      console.log(this.value);
    }
  }
}
</script>
