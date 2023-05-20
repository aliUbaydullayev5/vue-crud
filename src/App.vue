<template>
  <div class="main">
    <router-view />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.main{
  background-color: #fa998b;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
a{
  text-decoration: none;
}
p{
  margin: 0;
  padding: 0;
}
.nocopy {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.pointer {
  cursor: pointer;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
