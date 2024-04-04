<template>
  <div class="wedding-card">
    <div class="wedding-card__header">{{ fullName }}</div>
    <div class="wedding-card__grey-txt">
      {{ wedding.startDate }}<template v-if="wedding.endDate"> - {{ wedding.endDate }}</template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatPersonName } from '@/services/formatPersonName'

export default {
  name: 'WeddingItem',
  props: {
    wedding: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters ('persons', [
      'getPersonById'
    ]),
    getPartner () {
      return this.getPersonById(this.wedding.partnerId)
    },
    fullName () {
      if (this.getPartner) {
        return formatPersonName(this.getPartner, {short: true, access: this.needHide})
      }
      return ''
    }
  }
}
</script>

<style scoped lang ="less">
.wedding-card {
  border-radius: 24px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  margin-bottom: 15px;
  padding: 20px;
  padding-left: 25px;
  font-size: 20px;
  white-space: normal;
  font-family: 'Inter', sans-serif;

  &__header {
    color: #000000;
    font-weight: 700;
  }
  
  &__grey-txt {
    color: #757575;
    font-size: 14px;
  }
}
</style>
