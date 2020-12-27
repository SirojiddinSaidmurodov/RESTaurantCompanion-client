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
        <input id="name" v-model="name" class="form-control" type="text">
      </div>
      <div class="form-row">
        <label for="login">Login</label>
        <input id="login" v-model="login" class="form-control" type="text">
      </div>
      <div class="form-row">
        <label for="password">Password</label>
        <input id="password" v-model="password" class="form-control" type="text">
      </div>
      <div class="form-row"><label>User type
        <select v-model="userType" class="custom-select">
          <option selected value="0">Undefined</option>
          <option value="1">Admin</option>
          <option value="2">Cook</option>
          <option value="3">Waiter</option>
        </select>
      </label></div>
      <button class="btn btn-success" type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import DataService from "@/services/DataService";

export default {
  name: "userDetails",
  data() {
    return {
      name: "",
      login: "",
      password: "",
      userType: 0,
      errors: [],
      serverUrl: "http://localhost:8080/user/"
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
        this.name = res.data.name;
        this.login = res.data.login;
        this.password = res.data.password;
        this.userType = res.data.userType;
      });
    },
    handleSubmit: function (e) {
      e.preventDefault();
      const item = {
        name: this.name,
        login: this.login,
        password: this.password,
        userType: this.userType
      };
      if (this.id !== 0) {
        DataService.update(this.serverUrl, this.id, item).then(() => {
          this.$router.push("/users")
        })
      } else {
        DataService.create(this.serverUrl, item).then(() => {
          this.$router.push("/users")
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