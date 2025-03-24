<template>
  <div>
    <select :id="id" class="base_select" v-model="selectedOption" @change="handleChange">
      <option value="" disabled>
        <slot></slot>
      </option>
      
      <option
        v-for="option in options"
        :key="option.id ?? option"
        :value="option.name ?? option"
      >
        {{ option.name ?? option }}
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
    value: {
      type: [String, Object],
      default: '',
    }
  },
  data() {
    return {
      selectedOption: this.value,
    };
  },
  methods: {
    handleChange(event) {
      const value = event.target.value;
      this.$emit('input', value);
      this.$emit('onSelect', value);
    }
  },
  watch: {
    value(newValue) {
      this.selectedOption = newValue;
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