<template>
  <div>
    <select :id="id" class="base_select" v-model="selectedOption">
      <option value="" disabled>
        <slot></slot>
      </option>
      
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.name"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    id: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedOption: '',
    };
  },
  watch: {
    selectedOption() {
      this.$emit('onSelect', this.selectedOption);
    },
  },
}
</script>

<style>
.base_select {
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 6px;
  padding: 10px 24px;
}

#project_select {
  border: 1px solid #1976d2;
}

#project_select:focus {
  outline: 2px solid #1e6ebe;
}
</style>