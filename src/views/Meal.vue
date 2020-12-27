<template>
  <div class="container">
    <h1 class="display-3">Meal details</h1>
    <form @submit="handleSubmit">
      <div class="form-row">
        <label for="id">ID</label>
        <input id="id" v-model="id" class="form-control" disabled type="text">
      </div>
      <div class="form-row">
        <label for="name">Name</label>
        <input id="name" v-model="mealName" class="form-control" type="text">
      </div>
      <div class="form-row">
        <label for="cost">Price</label>
        <input id="cost" v-model="mealCost" class="form-control" type="number">
      </div>
      <div class="form-check">
        <input id="available" v-model="mealAvailable" class="form-check-input" type="checkbox">
        <label for="available">Available</label>
      </div>
      <button class="btn btn-success" type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import DataService from "@/services/DataService";

export default {
  name: "mealDetails",
  data() {
    return {
      mealName: "",
      mealCost: 0,
      mealAvailable: false,
      errors: [],
      mealsUrl: "http://localhost:8080/meal/"
    };
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id);
    }
  },
  methods: {
    refreshDetails() {
      DataService.get(this.mealsUrl, this.id).then(res => {
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
        DataService.update(this.mealsUrl, this.id, item).then(() => {
          this.$router.push("/meals")
        })
      } else {
        DataService.create(this.mealsUrl, item).then(() => {
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