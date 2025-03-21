<template>
  <button :id="id" @click.prevent="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    id: {
      type: String,
      default: 'base_button',
    },
  },
}
</script>

<style>
#base_button {
  /* some styles */
}


#login_button {
  background-color: #1976d2;
  border: none;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 15px;
  padding: 10px 24px;
}
</style>