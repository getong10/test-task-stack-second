<template>
  <div>
    <textarea
      class="base_textarea"
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
  name: 'BaseTextarea',
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
      default: '',
    },
  },
}
</script>

<style>
.base_textarea {
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 15px;
  padding: 10px 24px;
  resize: none;
  height: 70px;
}

#project_textarea {
  border: 1px solid #1976d2;
}

#project_textarea:focus {
  outline: 2px solid #1e6ebe;
}
</style>