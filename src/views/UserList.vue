<template>
  <div class="container">
    <h2 class="display-3">Users</h2>

    <div v-if="message" id="deleteMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
      <h4>Warning!</h4>
      {{ message }}
      <button class="btn btn-outline-danger" data-dismiss="alert" type="button" v-on:click="undo()">Cancel
      </button>

      <button aria-label="Close" class="close" data-dismiss="alert" type="button" v-on:click="deleteMessage()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <table class="table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Login</th>
        <th>UserType</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" v-bind:key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.login }}</td>
        <td>{{ userTypes[user.userType] }}</td>
        <td>
          <button class="btn btn-primary" v-on:click="update(user.id)">Edit</button>
        </td>
        <td>
          <button class="btn btn-danger" v-on:click="deleteItem(user.id)">Delete</button>
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
import {userTypes} from "@/config";

export default {
  name: "UserList",
  data() {
    return {
      users: [],
      message: null,
      last: null,
      serverUrl: "http://localhost:8080/user/"
    }
  },
  methods: {
    refresh() {
      DataService.getAll(this.serverUrl).then(response => {
        this.users = response.data;
      })
    },
    deleteItem(id) {
      DataService.delete(this.serverUrl, id).then(response => {
        this.message = 'Deleted ' + response.data.name + ' successful';
        this.last = {
          id: response.data.id,
          name: response.data.name,
          login: response.data.login,
          password: response.data.password,
          userType: response.data.userType
        };
        this.refresh();
      })
    },
    update(id) {
      this.$router.push('/users/' + id)
    },
    add() {
      this.$router.push(`/users/0`)
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
  },
  computed: {
    userTypes: () => userTypes
  }
}
</script>
<style scoped>
</style>