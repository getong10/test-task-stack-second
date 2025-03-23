<template>
  <div id="project_page">
    <div id="project_page_header">
      <div id="project_header_title">Информация о проекте</div>
      
      <div id="project_header_actions">
        <base-select :id="'project_input'" :options="this.projects" @onSelect="onSelectProject">Выберите проект</base-select>
      </div>
    </div>

    <div id="project_page_content">
      <div id="project_info">
        {{ this.selectedProject }}
      </div>
    </div>
  </div>
</template>

<script>
import BaseSelect from '@/components/ui/BaseSelect.vue';

export default {
  name: 'ProjectPage',
  components: {
    BaseSelect,
  },
  data() {
    return {
      projects: [],
      selectedProject: null,
    };
  },
  methods: {
    fetchProjects() {
      this.projects = localStorage.getItem('projects') ? 
        JSON.parse(localStorage.getItem('projects')): 
      [];
    },

    onSelectProject(projectName) {
      this.selectedProject = this.projects.find(project => project.name === projectName);
      if (this.selectedProject) {
        console.log(this.selectedProject.name);
      }
    },
  },
  created() {
    this.fetchProjects();
  },
}
</script>

<style>
#project_page {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

#project_page_header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 24px;
  font-weight: 600;
}

#project_header_title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: 600;
}

#project_header_actions {
  margin-left: auto;
}
</style>