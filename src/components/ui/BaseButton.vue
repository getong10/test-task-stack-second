<template>
  <button class="base_button_class" :id="id" @click.prevent="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
}
</script>

<style>
.base_button_class {
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 24px;
}

.base_button_class:focus {
  outline: 2px solid #1e6ebe;
}

#login_button {
  background-color: #1976d2;
  border: none;
  color: #ffffff;
  border-radius: 15px;
}

#logout_button,
#create_button,
#edit_button,
#cancel_button {
  background-color: #ffffff;
  border: 1px solid #1976d2;
  color: #1976d2;
  border-radius: 6px;
}

#logout_button:hover,
#create_button:hover,
#edit_button:hover,
#cancel_button:hover {
  background-color: #1976d2;
  color: #ffffff;
}

#logout_button {
  width: 100%;
}

#close_button {
  background-color: #ffffff;
  border: none;
  color: #1976d2;
  border-radius: 20px;
  position: absolute;
  padding: 4px 8px;
  top: 0px;
  right: 0px;
}

#close_button:focus {
  outline: none;
}

#delete_button {
  background-color: #ffffff;
  border: 1px solid #f44336;
  color: #f44336;
  border-radius: 6px;
}

#delete_button:hover {
  background-color: #f44336;
  color: #ffffff;
}
</style>