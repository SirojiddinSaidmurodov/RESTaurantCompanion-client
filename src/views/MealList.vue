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
        <th>Update</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="meal in meals" v-bind:key="meal.id">
        <td>{{ meal.mealName }}</td>
        <td>{{ meal.mealCost }}</td>
        <td>{{ meal.mealAvailable }}</td>
        <td>
          <button class="btn btn-primary" v-on:click="updateMeal(meal.id)">Edit</button>
        </td>
        <td>
          <button class="btn btn-danger" v-on:click="deleteMeal(meal.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="row">
      <button class="btn btn-success" v-on:click="addMeal()">Add</button>
    </div>
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
    },
    updateMeal(id) {
      this.$router.push('/meals/' + id)
    },
    addMeal(){
      this.$router.push(`/meals/0`)
    }
  },
  created() {
    this.refreshMeals();
  }
}
</script>

<style scoped>

</style>