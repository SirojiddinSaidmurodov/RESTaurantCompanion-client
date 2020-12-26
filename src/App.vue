<template>

  <div class="row">
    <div class="col-3">
      <div id="v-pills-tab" aria-orientation="vertical" class="nav flex-column nav-pills" role="tablist">
        <div id="v-pills-home-tab" v-on:click="$router.push('/')" aria-controls="v-pills-home" aria-selected="true" class="nav-link active" data-toggle="pill"
           role="tab">Home</div>
        <div id="v-pills-profile-tab" v-on:click="$router.push('/meals')" aria-controls="v-pills-profile" aria-selected="false" class="nav-link" data-toggle="pill"
           role="tab">Menu</div>
        <a id="v-pills-messages-tab" aria-controls="v-pills-messages" aria-selected="false" class="nav-link" data-toggle="pill"
           role="tab">Messages</a>
        <a id="v-pills-settings-tab" aria-controls="v-pills-settings" aria-selected="false" class="nav-link" data-toggle="pill"
           role="tab">Settings</a>
      </div>
    </div>
    <div class="col-9">

      <div class="container">
        <router-view/>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'app'
};
</script>
<style lang="scss">
</style>
