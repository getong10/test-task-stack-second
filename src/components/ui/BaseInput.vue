<template>
  <div>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    id: {
      type: String,
      default: 'base_input',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: 'Введите текст',
    },
    value: {
      type: String,
      default: 'text',
    },
  },
}
</script>

<style>
#base_input {
  /* some styles */
}


#login_input {
  border: 1px solid #1976d2;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 15px;
  padding: 10px 24px;
}
</style>