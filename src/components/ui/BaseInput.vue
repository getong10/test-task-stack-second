<template>
  <div>
    <input
      class="base_input"
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
      default: '',
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
.base_input {
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 15px;
  padding: 10px 24px;
}

#login_input, #project_input {
  border: 1px solid #1976d2;
}

#login_input:focus, #project_input:focus {
  outline: 2px solid #1e6ebe;
}
</style>