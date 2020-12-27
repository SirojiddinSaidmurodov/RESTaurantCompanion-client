<template>

  <div class="row">
    <div class="col-2">
      <div id="v-pills-tab" aria-orientation="vertical" class="nav flex-column nav-pills" role="tablist">
        <div aria-controls="v-pills-home" aria-selected="true" class="nav-link active"
             data-toggle="pill" role="tab"
             v-on:click="$router.push('/')">Home
        </div>
        <div aria-controls="v-pills-profile" aria-selected="false"
             class="nav-link" data-toggle="pill" role="tab"
             v-on:click="$router.push('/meals')">Menu
        </div>
        <div aria-controls="v-pills-messages" aria-selected="false"
             class="nav-link" data-toggle="pill"
             role="tab"
             v-on:click="$router.push('/orders')">Orders
        </div>
        <div aria-controls="v-pills-settings" aria-selected="false"
             class="nav-link" data-toggle="pill"
             role="tab"
             v-on:click="$router.push('/users')">Users
        </div>
      </div>
    </div>
    <div class="col-10">

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
