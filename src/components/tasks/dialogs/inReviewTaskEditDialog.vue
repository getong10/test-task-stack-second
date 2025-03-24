<template>
  <dialog-view>
    <template v-slot:dialog_header>
      <div>Редактирование задачи</div>
      <base-button :id="'close_button'" @click="$emit('close')">X</base-button>
    </template>

    <template v-slot:dialog_content>
      <div>{{ taskData.name }}</div>
      <base-textarea v-model="taskData.description" :id="'project_textarea'" :placeholder="'Описание задачи'"></base-textarea>
    </template>

    <template v-slot:dialog_actions>
      <base-button :id="'edit_button'" @click="$emit('save', taskData)">Сохранить</base-button>
      <base-button :id="'edit_button'" @click="toProcess">Вернуть в работу</base-button>
      <base-button :id="'edit_button'" @click="toComplete">Завершить</base-button>
    </template>
  </dialog-view>
</template>

<script>
import DialogView from '@/views/DialogView.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseTextarea from '@/components/ui/BaseTextarea.vue';

export default {
  name: 'inReviewTaskEditDialog',
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
    },

    toComplete() {
      this.taskData.status = 'Завершено'
      this.$emit('toComplete', this.taskData)
    },
  },
  created() {
    Object.assign(this.taskData, this.task)
  },
  components: {
    DialogView,
    BaseButton,
    BaseTextarea
  },
}
</script>

<style>

</style>