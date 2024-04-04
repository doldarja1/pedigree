<template>
  <button
    class="relate-button"
    :class="'relate-button__' + (isMale ? 'male' : 'female')"
  >
    <template v-if="relate === 'parent'">
      {{ isMale ? 'Отец: ' : 'Мать: ' }}
    </template>
    <template v-else-if="relate === 'child'">
      {{ isMale ? 'Сын: ' : 'Дочь: ' }}
    </template>
    {{ formatName }}
  </button>
</template>

<script>
import { mapGetters } from 'vuex';
import { maskFio } from '@/utils/mask';
import { formatPersonName } from '@/services/formatPersonName';

export default {
  name: 'RelateButton',
  props: {
    person: {
      type: Object,
      required: true
    },
    relate: {
      type: String,
      default: 'child',
      validator: value => ['child', 'parent'].includes(value)
    }
  },
  computed: {
    ...mapGetters('settings', [
      'getAccess'
    ]),
    formatName () {
      return formatPersonName(this.person, { short: true, access: this.needHide })
    },
    isMale () {
      return this.person.gender === 'male'
    },
    needHide(){
      return this.person.access && this.getAccess
    },
    secondNameFormatted(){
      if (!this.person) {
        return ''
      }
      if (this.needHide) {
        return maskFio(this.person.secondName)
      }
      return this.person.secondName
    }
  }
}
</script>

<style scoped lang="less">
.relate-button {
  margin-right: 10px;
  margin-bottom: 10px;
  border: none;
  padding: 10px 20px;
  color: black;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;

  &__male {
    background-color: #adffb4;
  }

  &__female {
    background-color: #adffe6;
  }
}
</style>
