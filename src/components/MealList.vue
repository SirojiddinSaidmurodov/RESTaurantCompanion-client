<template>
  <div class="container">
    <h2>Menu</h2>
    <div v-if="message" class="alert alert-success">
      {{ message }}
    </div>
    <table class="table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Available</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="meal in meals" v-bind:key="meal.id">
        <td>{{ meal.mealName }}</td>
        <td>{{ meal.mealCost }}</td>
        <td>{{ meal.mealAvailable }}</td>
        <td>
          <button class="btn btn-danger" v-on:click="deleteMeal(meal.id)">Delete</button>
        </td>
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
    },
    deleteMeal(id) {
      MealDataService.delete(id).then(response => {
        this.message = 'delete ' + id + ' successful';
        this.refreshMeals();
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