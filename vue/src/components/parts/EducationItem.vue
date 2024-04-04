<template>
  <div class="education-card">
    <div class="education-card__header">
      <h2 class="education-card__institution">{{ education.name }}</h2>
      <div class="education-card__dates">
        {{ formatDate(education.startDate) }} - {{ education.endDate ? formatDate(education.endDate) : 'настоящее время' }}
      </div>
    </div>

    <div class="education-card__body">
      <div class="education-card__detail">
        <span class="education-card__detail-label">Тип:</span> {{ education.type }}
      </div>
      <div class="education-card__detail">
        <span class="education-card__detail-label">Уровень образования:</span> {{ education.level }}
      </div>
      <div class="education-card__detail">
        <span class="education-card__detail-label">Город:</span> {{ education.city }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EducationCard',
  props: {
    education: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      // Функция для форматирования даты, если необходимо
      return date
    }
  }
}
</script>

<style scoped lang="less">
@base-color: #333;
@light-color: #666;
@font-family: 'Inter', sans-serif;

.education-card {
  display: flex;
  flex-direction: column;
  min-width: 200;
  border-radius: 24px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 15px;
  font-family: @font-family;

  &__header {
    margin-bottom: 15px;
  }

  &__institution {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
  }

  &__dates {
    font-size: 14px;
    color: @light-color;
  }

  &__body {
    display: flex;
    flex-direction: column;
  }

  &__detail {
    font-size: 16px;
    color: @base-color;
  }

  &__detail-label {
    font-weight: 600;
  }
}
</style> 
