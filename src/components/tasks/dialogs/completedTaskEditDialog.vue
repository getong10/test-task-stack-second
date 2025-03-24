<template>
  <dialog-view>
    <template v-slot:dialog_header>
      <div>Просмотр задачи</div>
      <base-button :id="'close_button'" @click="$emit('close')">X</base-button>
    </template>

    <template v-slot:dialog_content>
      <div>{{ taskData.name }}</div>
      <div>{{ taskData.description }}</div>
    </template>

    <template v-slot:dialog_actions>
      <base-button :id="'edit_button'" @click="toProcess">Вернуть в работу</base-button>
    </template>
  </dialog-view>
</template>

<script>
import DialogView from '@/views/DialogView.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  name: 'completedTaskEditDialog',
  props: {
    task: {
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      taskData: this.task,
    }
  },
  methods: {
    toProcess() {
      this.taskData.status = 'В работе'
      this.$emit('toProcess', this.taskData)
    }
  },
  created() {
    Object.assign(this.taskData, this.task)
  },
  components: {
    DialogView,
    BaseButton
  }
}
</script>

<style>

</style>