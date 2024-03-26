<template>
  <div class="error-page">
    <h1>Invalid Request</h1>
    <p>Sorry, the request you made is invalid.</p>
  </div>
</template>

<script>
  export default {
    name: 'ErrorPage',
  };
</script>

<style scoped>
  .error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Arial, sans-serif;
  }

  h1 {
    font-size: 2em;
    color: red;
  }

  p {
    font-size: 1.2em;
  }
</style>
