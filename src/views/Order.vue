<template>
  <div class="container">
    <h1 class="display-3">Order details</h1>

    <div v-if="message" id="deleteMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
      <h4>Warning!</h4>
      {{ message }}
      <button class="btn btn-outline-danger" data-dismiss="alert" type="button" v-on:click="undo()">Cancel
      </button>

      <button aria-label="Close" class="close" data-dismiss="alert" type="button" v-on:click="deleteMessage()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <form @submit="handleSubmit">
      <div class="form-row">
        <label for="id">ID</label>
        <input id="id" v-model="id" class="form-control" disabled type="text">
      </div>

      <div class="form-row">
        <label for="login">Table</label>
        <input id="login" v-model="tableID" class="form-control" type="number">
      </div>
      <div class="form-check p-3">
        <input id="available" v-model="ready" class="form-check-input" type="checkbox">
        <label for="available">Ready</label>
      </div>
      <div class="form-row"><label>Waiter
        <select v-model="waiterID" class="custom-select">
          <option v-for="waiter in waiters" :value="waiter.id">{{ waiter.name }}</option>
        </select>
      </label></div>
      <p v-if="this.id!==0" class="h5">Items</p>
      <button v-if="this.id!==0" class="btn btn-primary" v-on:click="$router.push('/orders/' + id + '/' + 0)">Add
      </button>
      <ul v-if="this.id!==0" class="list-group">
        <li v-for="item in orderItems" class="list-group-item">{{ item.meal.mealName }}
          <div class="btn btn-danger mr-3" v-on:click="deleteItem(item.id)">Delete</div>
          <div class="btn btn-primary mr-3" v-on:click="$router.push('/orders/' + id + '/' + item.id)">Edit</div>
        </li>
      </ul>
      <button class="btn btn-success mr-3" type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import DataService from "@/services/DataService";

export default {
  name: "Order",
  data() {
    return {
      waiterID: 0,
      tableID: 0,
      ready: false,
      waiters: null,
      orderItems: [],
      message: null,
      serverUrl: "http://localhost:8080/order/",
      itemUrl: "http://localhost:8080/orderItem/",
    };
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id);
    }
  },
  methods: {
    refreshDetails() {
      DataService.get(this.serverUrl, this.id).then(res => {
        this.waiterID = res.data.waiterID;
        this.tableID = res.data.tableID;
        this.ready = res.data.ready;
      });
      DataService.getAll(this.itemUrl + "?expand&orderID=" + this.id).then(response => {
        this.orderItems = response.data;
      })
    }
    ,
    handleSubmit: function (e) {
      e.preventDefault();
      const item = {
        waiterID: this.waiterID,
        tableID: this.tableID,
        ready: this.ready
      };
      if (this.id !== 0) {
        DataService.update(this.serverUrl, this.id, item).then(() => {
          this.$router.push("/orders")
        })
      } else {
        DataService.create(this.serverUrl, item).then(() => {
          this.$router.push("/orders")
        })
      }
    },
    deleteItem(id) {
      DataService.delete(this.itemUrl, id).then(response => {
        this.message = 'Deleted ' + response.data.mealName + ' successful';
        this.last = {
          id: response.data.id,
          mealID: response.data.mealID,
          orderID: response.data.orderID,
          quantity: response.data.quantity,
        };
        this.refreshDetails();
      })
    },
    async undo() {
      await DataService.create(this.itemUrl, this.last);
      this.message = null;
      this.refreshDetails();
    },
    deleteMessage() {
      this.message = null;
    }
  },
  created() {
    if (this.id !== 0) {
      this.refreshDetails();
    }
    DataService.getAll("http://localhost:8080/user").then(res => {
      this.waiters = res.data;
    })
  }
};
</script>

<style scoped>

</style>