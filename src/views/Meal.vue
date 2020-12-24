<template>
  <div class="container">
    <h1>Meal details</h1>
    <form @submit="handleSubmit">
      <div class="form-row">
        <label for="id">ID</label>
        <input id="id" type="text" class="form-control" v-model="id" disabled>
      </div>
      <div class="form-row">
        <label for="name">Name</label>
        <input id="name" type="text" class="form-control" v-model="mealName">
      </div>
      <div class="form-row">
        <label for="cost">Price</label>
        <input id="cost" type="number" class="form-control" v-model="mealCost">
      </div>
      <div class="form-row">
        <label for="available">Available</label>
        <input id="available" type="checkbox" class="form-control" v-model="mealAvailable">
      </div>
      <button class="btn btn-success" type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import MealDataService from "@/services/MealDataService";

export default {
  name: "mealDetails",
  data() {
    return {
      mealName: "",
      mealCost: 0,
      mealAvailable: false,
      errors: []
    };
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id);
    }
  },
  methods: {
    refreshDetails() {
      MealDataService.get(this.id).then(res => {
        this.mealName = res.data.mealName;
        this.mealCost = res.data.mealCost;
        this.mealAvailable = res.data.mealAvailable;
      });
    },
    handleSubmit: function (e) {
      e.preventDefault();
      const item = {
        mealName: this.mealName,
        mealCost: this.mealCost,
        mealAvailable: this.mealAvailable
      };
      if (this.id !== 0) {
        MealDataService.update(this.id, item).then(() => {
          this.$router.push("/meals")
        })
      } else {
        MealDataService.create(item).then(() => {
          this.$router.push("/meals")
        })
      }
    }
  },
  created() {
    if (this.id !== 0) {
      this.refreshDetails();
    }
  }
};
</script>

<style scoped>

</style>