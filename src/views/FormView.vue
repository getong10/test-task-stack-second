<template>
  <div id="form_container">
    <div id="form_header">
      <slot name="form_header"></slot>
    </div>
    <div id="form_content">
      <slot name="form_content"></slot>
    </div>
    <div id="form_footer">
      <slot name="form_footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormView',
  components: {
  },
}
</script>

<style>
#form_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  padding: 20px;
  gap: 20px;
  border-radius: 10px;
  background-color: #ffffff;
}

#form_header {
  font-size: 24px;
  font-weight: 600;
}

#form_content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>