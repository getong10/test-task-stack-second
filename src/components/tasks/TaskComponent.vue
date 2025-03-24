<template>
  <div id="task_component_container">
    <div id="task_component_header">
      <span id="task_component_header_name">{{ task.name }}</span>
    </div>

    <div id="task_component_body">
      <span id="task_component_body_description">{{ task.description }}</span>
    </div>

    <div id="task_component_footer">
      <base-button :id="'edit_button'" @click="$emit('edit', task)">Редактировать</base-button>
      <base-button :id="'delete_button'" @click="$emit('delete', task.id)">Удалить</base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';

export default {
  name: 'taskComponent',
  components: {
    BaseButton,
  },
  props: {
    task: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style>
#task_component_container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  border: 1px solid #1976d2;
  border-radius: 5px;
  padding: 10px;
}

#task_component_header {
  font-size: 18px;
  font-weight: 600;
}

#task_component_body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#task_component_footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}
</style>