<template>
  <form @submit.prevent="takeForm()">
    <div class="custom-form">
      <ElInput
        v-model="fullName"
        class="custom-form__input"
        :class="{invalid: isFullNameInvalid }"
        type="text"
        placeholder="Ваше имя"
      />
      <ElInput
        v-model="phoneNumber"
        class="custom-form__input"
        :class="{invalid: isPhoneNumberInvalid }"
        type="text"
        placeholder="Номер телефона"
      />
      <ElInput
        v-model="mail"
        class="custom-form__input"
        :class="{invalid: isMailInvalid }"
        type="text"
        placeholder="E-mail"
      />
      <div class="custom-form__full-width">
        <ElInput
          v-model="message"
          class="custom-form__input"
          :class="{invalid: isMessageInvalid }"
          type="textarea"
          placeholder="Сообщение"
        />
      </div>
      <SimpleButton 
        type="info"
        @click="() => takeForm()"
      >
        Сохранить
      </SimpleButton>
    </div>
  </form>
</template>

<script>
import SimpleButton from '../ui/SimpleButton.vue'

export default {
  name: 'FeedbackForm',
  components: {
    SimpleButton
  },
  data () {
    return {
      fullName: null,
      phoneNumber: null,
      mail: null,
      message: null
    }
  },
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
    isFullNameInvalid () {
      return !this.fullName || !/^[а-яё]*$/i.test(this.fullName)
    },
    isPhoneNumberInvalid () {
      return !this.phoneNumber || !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/i.test(this.phoneNumber)
    },
    isMailInvalid () {
      return !this.mail || !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(this.mail)
    },
    isMessageInvalid () {
      return !this.message
    },
    isFormInvalid () {
      return this.isFullNameInvalid || this.isMailInvalid || this.isMessageInvalid || this.isPhoneNumberInvalid
    }
  },
  methods: {
    takeForm () {
      if (this.isFormInvalid) {
        this.handleInvalidForm()
        return ''
      }
      const fullForm = {
        fullName: this.fullName,
        phoneNumber: this.phoneNumber,
        mail: this.mail,
        message: this.message
      }
      console.log(fullForm)
      this.emitFormData(fullForm)
    },
    emitFormData (param) {
      this.$emit('change', {
        ...this.value,
        ...param
      })
    },
    handleInvalidForm () {
      console.log('invalid form')
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

.invalid {
  border: solid 1px red;
  border-radius: 5px;
}
</style>
