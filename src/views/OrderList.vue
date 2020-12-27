<template>
  <div class="container">
    <h2 class="display-3">Orders</h2>
    <div class="btn btn-success mb-3" v-on:click="add()">Add</div>
    <div v-if="message" id="deleteMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
      <h4>Warning!</h4>
      {{ message }}
      <button class="btn btn-outline-danger" data-dismiss="alert" type="button" v-on:click="undo()">Cancel
      </button>

      <button aria-label="Close" class="close" data-dismiss="alert" type="button" v-on:click="deleteMessage()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="card-columns">
      <div v-for="order in orders" v-if="!order.ready" class="card bg-light mb-3">
        <div class="card-header">{{ order.id % 100 }}</div>
        <div class="card-body">
          <h4 class="card-title">
            {{ order.waiterID }}
          </h4>
          <h6 class="card-subtitle">Table {{ order.tableID }}</h6>
          <div class="card-text">
            <ul>
              <li v-for="meal in order.items">{{ meal }}</li>
            </ul>
          </div>
          <div class="btn btn-outline-dark mr-2" v-on:click="update(order.id)">Edit</div>
          <div class="btn btn-outline-danger mr-2" v-on:click="deleteItem(order.id)">Delete
          </div>
        </div>
      </div>
      <div v-for="order in orders" v-if="order.ready" class="card text-white bg-dark mb-3">
        <div class="card-header">{{ order.id % 100 }}</div>
        <div class="card-body">
          <h4 class="card-title">
            {{ order.waiterID }}
          </h4>
          <h6 class="card-subtitle">Table {{ order.tableID }}</h6>
          <div class="card-text">
            <ul>
              <li v-for="meal in order.items">{{ meal }}</li>
            </ul>
          </div>
          <div class="btn btn-outline-light mr-2" v-on:click="update(order.id)">Edit</div>
          <div class="btn btn-outline-danger mr-2" v-on:click="deleteItem(order.id)">Delete
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import DataService from "@/services/DataService";

export default {
  name: "OrderList",
  data() {
    return {
      orders: [],
      message: null,
      last: null,
      serverUrl: "http://localhost:8080/order/"
    }
  },
  methods: {
    refresh() {
      DataService.getAll(this.serverUrl).then(response => {
        this.orders = response.data;
      })
    },
    deleteItem(id) {
      DataService.delete(this.serverUrl, id).then(response => {
        this.message = 'Deleted ' + response.data.mealName + ' successful';
        this.last = {
          id: response.data.id,
          waiterID: response.data.waiterID,
          tableID: response.data.tableID,
          ready: response.data.ready,
        };
        this.refresh();
      })
    },
    update(id) {
      this.$router.push('/orders/' + id)
    },
    add() {
      this.$router.push(`/orders/0`)
    },
    async undo() {
      await DataService.create(this.serverUrl, this.last);
      this.message = null;
      this.refresh();
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