<template>
  <div id="dialog_container">
    <form-view>
      <template v-slot:form_header>
        <slot name="dialog_header"></slot>
      </template>

      <template v-slot:form_content>
        <slot name="dialog_content"></slot>
      </template>

      <template v-slot:form_actions>
        <slot name="dialog_actions"></slot>
      </template>
    </form-view>
  </div>
</template>

<script>
import FormView from '@/views/FormView.vue'
export default {
  name: 'DialogView',
  components: {
    FormView,
  },
}
</script>

<style>
#dialog_container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>