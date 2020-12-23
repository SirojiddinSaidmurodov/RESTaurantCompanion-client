<template>
  <div class="container">
    <h2>Menu</h2>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Description</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="meal in meals" v-bind:key="meal.id">
        <td>{{ meal.id }}</td>
        <td>{{ meal.mealName }}</td>
        <td>{{ meal.mealCost }}</td>
        <td>{{ meal.mealAvailable }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import MealDataService from "@/services/MealDataService";

export default {
  name: "MealList",
  data() {
    return {
      meals: [],
      message: null
    }
  },
  methods: {
    refreshMeals() {
      MealDataService.getAll().then(response => {
        this.meals = response.data;
      })
    }
  },
  created() {
    this.refreshMeals();
  }
}
</script>

<style scoped>

</style>