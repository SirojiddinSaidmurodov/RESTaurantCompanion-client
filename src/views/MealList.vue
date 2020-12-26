<template>
  <div class="container">
    <h2>Menu</h2>

    <div v-if="message" class="alert alert-danger alert-dismissible fade show" role="alert">
      <h4>Warning!</h4>
      {{ message }}
      <button class="btn btn-outline-danger" data-dismiss="alert" type="button" v-on:click="undo()">Cancel
      </button>

      <button aria-label="Close" class="close" data-dismiss="alert" type="button">
        <span aria-hidden="true">&times;</span>
      </button>
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
      message: null,
      last: null
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
        this.message = 'Deleted ' + response.data.mealName + ' successful';
        this.last = {
          id: response.data.id,
          mealAvailable: response.data.mealAvailable,
          mealCost: response.data.mealCost,
          mealName: response.data.mealName
        };
        this.refreshMeals();
      })
    },
    updateMeal(id) {
      this.$router.push('/meals/' + id)
    },
    addMeal() {
      this.$router.push(`/meals/0`)
    },
    async undo() {
      await MealDataService.create(this.last);
      this.refreshMeals();
    }
  },
  created() {
    this.refreshMeals();
  }
}
</script>
<style scoped>

</style>