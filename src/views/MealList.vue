<template>
  <div class="container-sm">
    <h2 class="display-3">Menu</h2>

    <div v-if="message" id="deleteMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
      <h4>Warning!</h4>
      {{ message }}
      <button class="btn btn-outline-danger" data-dismiss="alert" type="button" v-on:click="undo()">Cancel
      </button>

      <button aria-label="Close" class="close" data-dismiss="alert" type="button" v-on:click="deleteMessage()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <table class="table table-hover table-borderless" style="max-width: 600px">
      <thead class="thead-light">
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Update</th>
        <th scope="col">Delete</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="meal in meals" v-if="meal.mealAvailable" v-bind:key="meal.id">
        <td>{{ meal.mealName }}</td>
        <td>{{ meal.mealCost }}</td>
        <td>
          <button class="btn btn-primary" v-on:click="update(meal.id)">Edit</button>
        </td>
        <td style="width: 50px">
          <button class="btn btn-danger" v-on:click="deleteItem(meal.id)">Delete</button>
        </td>
      </tr>
      <tr v-for="meal in meals" v-if="!meal.mealAvailable" v-bind:key="meal.id" class="table-danger">
        <td>{{ meal.mealName }}</td>
        <td>{{ meal.mealCost }}</td>
        <td style="width: 50px">
          <button class="btn btn-primary" v-on:click="update(meal.id)">Edit</button>
        </td>
        <td style="width: 50px">
          <button class="btn btn-danger" v-on:click="deleteItem(meal.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="row">
      <button class="btn btn-success" v-on:click="add()">Add</button>
    </div>
  </div>
</template>

<script>
import DataService from "@/services/DataService";

export default {
  name: "MealList",
  data() {
    return {
      meals: [],
      message: null,
      last: null,
      serverUrl: "http://localhost:8080/meal/"
    }
  },
  methods: {
    refresh() {
      DataService.getAll(this.serverUrl).then(response => {
        this.meals = response.data;
      })
    },
    deleteItem(id) {
      DataService.delete(this.serverUrl, id).then(response => {
        this.message = 'Deleted ' + response.data.mealName + ' successful';
        this.last = {
          id: response.data.id,
          mealAvailable: response.data.mealAvailable,
          mealCost: response.data.mealCost,
          mealName: response.data.mealName
        };
        this.refresh();
      })
    },
    update(id) {
      this.$router.push('/meals/' + id)
    },
    add() {
      this.$router.push(`/meals/0`)
    },
    async undo() {
      await DataService.create(this.serverUrl, this.last);
      this.refresh();
      this.message = null;
    },
    deleteMessage() {
      this.message = null;
    }
  },
  created() {
    this.refresh();
  }
}
</script>
<style scoped>

</style>