<template>
  <div class="container">
    <h1 class="display-3">Order details</h1>
    <form @submit="handleSubmit">
      <div class="form-row">
        <label for="id">ID</label>
        <input id="id" v-model="id" class="form-control" disabled type="text">
      </div>

      <div class="form-row">
        <label for="login">Table</label>
        <input id="login" v-model="tableID" class="form-control" type="number">
      </div>
      <div class="form-check">
        <input id="available" v-model="ready" class="form-check-input" type="checkbox">
        <label for="available">Ready</label>
      </div>
      <div class="form-row"><label>Waiter
        <select v-model="waiterID" class="custom-select">
          <option selected value="0">Undefined</option>
          <option v-for="waiter in waiters" :value="waiter.id">{{ waiter.name }}</option>
        </select>
      </label></div>
      <button class="btn btn-success" type="submit">Save</button>
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
      serverUrl: "http://localhost:8080/order/"
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
    },
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