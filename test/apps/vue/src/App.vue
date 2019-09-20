<template>
  <div>
    <p>This is a micro-frontend demo in VueJS 2.6</p>
    <p>You clicked {{ count }} times</p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      count: 0,
    }
  },
  name: 'app'
}
</script>

<style scoped>
div {
  background-color: #ffe09b;
  padding: 20px;
  width: 400px;
}
</style>
