<template>
  <div class="container">
    <h1 class="display-3">Order item</h1>
    <form @submit="handleSubmit">
      <div class="form-row"><label>Meal
        <select v-model="mealID" class="custom-select" required>
          <option v-for="meal in meals" :value="meal.id">{{ meal.mealName }}</option>
        </select>
      </label></div>
      <div class="form-row">
        <label>Quantity
          <input v-model="quantity" required type="number">
        </label>
      </div>
      <button class="btn btn-success mr-3" type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import DataService from "@/services/DataService";

export default {
  name: "OrderItem",
  data() {
    return {
      meals: null,
      mealID: 0,
      quantity: 1,
      itemUrl: "http://localhost:8080/orderItem/"
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id);
    },
    orderID() {
      return parseInt(this.$route.params.orderID)
    }
  },
  methods: {
    handleSubmit: function (e) {
      e.preventDefault();
      const item = {
        id: this.id,
        mealID: this.mealID,
        orderID: this.orderID,
        quantity: parseInt(this.quantity)
      }
      if (this.id !== 0) {
        DataService.update(this.itemUrl, this.id, item).then(() => {
          this.$router.push("/orders/" + this.orderID);
        })
      } else {
        DataService.create(this.itemUrl, item).then(() => {
          this.$router.push("/orders/" + this.orderID);
        })
      }
    },
    refresh() {
      DataService.get(this.itemUrl, this.id).then(response => {
        this.mealID = response.data.mealID;
        this.quantity = response.data.quantity;
      })
    }
  },
  created() {
    if (this.id !== 0) {
      this.refresh();
    }
    DataService.getAll("http://localhost:8080/meal").then(response => {
      this.meals = response.data;
    })
  }
}
</script>

<style scoped>

</style>