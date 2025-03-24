<template>
  <dialog-view>
    <template v-slot:dialog_header>
      <div>Редактирование задачи</div>
      <base-button :id="'close_button'" @click="$emit('close')">X</base-button>
    </template>

    <template v-slot:dialog_content>
      <base-input v-model="taskData.name" :id="'project_input'" :placeholder="'Название задачи'"></base-input>
      <base-textarea v-model="taskData.description" :id="'project_textarea'" :placeholder="'Описание задачи'"></base-textarea>
    </template>

    <template v-slot:dialog_actions>
      <base-button :id="'edit_button'" @click="$emit('save', taskData)">Сохранить</base-button>
      <base-button :id="'edit_button'" @click="toReview">Отправить на проверку</base-button>
    </template>
  </dialog-view>
</template>

<script>
import DialogView from '@/views/DialogView.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseTextarea from '@/components/ui/BaseTextarea.vue';

export default {
  name: 'inProgressTaskEditDialog',
  props: {
    task: {
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      taskData: {},
    }
  },
  methods: {
    toReview() {
      this.taskData.status = 'На проверке'
      this.$emit('toReview', this.taskData)
    }
  },
  created() {
    Object.assign(this.taskData, this.task)
  },
  components: {
    DialogView,
    BaseButton,
    BaseInput, 
    BaseTextarea
  },
}
</script>

<style>

</style>