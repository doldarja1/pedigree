<template>
  <div class="military-card">
    <div class="military-card__rank">
      {{ military.rank }}
    </div>
    <div class="military-card__date">
      {{ military.startDate }}<template v-if="military.endDate"> - {{ military.endDate }}</template>
    </div>
    <div class="military-card__type">
      {{ military.type }}
    </div>
    <div class="military-card__description">
      {{ military.description }}
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'MilitaryItem',
  props: {
    military: {
      type: Object,
      required: true
    }
  }
}
</script>
  
<style scoped lang ="less">
.military-card {
  border-radius: 24px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  margin-bottom: 15px;
  padding: 20px;
  padding-left: 25px;
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  white-space: normal;

  &__rank {
    color: #000000;
    font-weight: 700;
  }

  &__date {
    color: #757575;
    font-size: 14px;
  }

  &__type {
    color: #000000;
    font-weight: 700;
  }

  &__description {
    color: #757575;
    font-weight: 500;
    font-size: 14px;
    min-height: 100px;
  }
}
</style>
