<template>
  <div id="dashboard_page">
    <div id="dashboard_page_header">
      <div id="dashboard_header_title">Обзор проектов</div>
      
      <div id="dashboard_header_actions">
        <base-button :id="'create_button'" @click="openCreateProjectModal">Создать проект</base-button>
      </div>
    </div>

    <div id="dashboard_page_content">
      <div id="dashboard_projects_list">
        <div v-for="project in projects" :key="project.id" class="dashboard_project_item">
          <div class="dashboard_project_name">{{ project.name }}</div>
          <div class="dashboard_project_description">{{ project.description }}</div>

          <div class="dashboard_project_progress">
            {{ 
              project.tasks.length>0?
                `Выполнено ${project.tasks.filter(task => task.status==='Завершено').length} из ${project.tasks.length}`:
              'Нет задач' 
            }}
          </div>

          <div class="dashboard_project_actions">
            <base-button :id="'edit_button'" @click="openEditProjectModal(project.id)">Редактировать</base-button>
            <base-button :id="'delete_button'" @click="openDeleteProjectModal(project.id)">Удалить</base-button>
          </div>
        </div>
      </div>
    </div>

    <dialog-view v-if="isCreateProjectModalVisible">
      <template v-slot:dialog_header>
        <div>Создание проекта</div>
        <base-button :id="'close_button'" @click="clearCreateProjectModal">X</base-button>
      </template>

      <template v-slot:dialog_content>
        <base-input v-model="projectData.name" :id="'project_input'" :placeholder="'Название проекта'"></base-input>
        <base-textarea v-model="projectData.description" :id="'project_textarea'" :placeholder="'Описание проекта'"></base-textarea>
      </template>

      <template v-slot:dialog_actions>
        <base-button :id="'create_button'" @click="createProject">Создать</base-button>
      </template>
    </dialog-view>

    <dialog-view v-if="isEditProjectModalVisible">
      <template v-slot:dialog_header>
        <div>Редактирование проекта</div>
        <base-button :id="'close_button'" @click="clearEditProjectModal">X</base-button>
      </template>

      <template v-slot:dialog_content>
        <base-input v-model="editProjectData.name" :id="'project_input'" :placeholder="'Название проекта'"></base-input>
        <base-textarea v-model="editProjectData.description" :id="'project_textarea'" :placeholder="'Описание проекта'"></base-textarea>
      </template>

      <template v-slot:dialog_actions>
        <base-button :id="'edit_button'" @click="editProject">Сохранить</base-button>
      </template>
    </dialog-view>

    <dialog-view v-if="isDeleteProjectModalVisible">
      <template v-slot:dialog_header>
        <div>Удалить проект?</div>
        <base-button :id="'close_button'" @click="clearDeleteProjectModal">X</base-button>
      </template>

      <template v-slot:dialog_actions>
        <base-button :id="'delete_button'" @click="deleteProject">Удалить</base-button>
        <base-button :id="'cancel_button'" @click="clearDeleteProjectModal">Отмена</base-button>
      </template>
    </dialog-view>
  </div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseTextarea from '@/components/ui/BaseTextarea.vue';
import DialogView from '@/views/DialogView.vue';

export default {
  name: 'DashboardPage',
  components: {
    BaseButton,
    BaseInput,
    BaseTextarea,
    DialogView,
  },
  data() {
    return {
      isCreateProjectModalVisible: false,
      isEditProjectModalVisible: false,
      isDeleteProjectModalVisible: false,
      projectData: {
        name: '',
        description: '',
        tasks: [],
      },
      projects: [],
      editProjectData: {
        id: null,
        name: '',
        description: '',
      },
      deleteProjectId: null,
    };
  },
  methods: {
    openCreateProjectModal() {
      this.isCreateProjectModalVisible = true;
    },

    clearCreateProjectModal() {
      this.isCreateProjectModalVisible = false;
      this.projectData.name = '';
      this.projectData.description = '';
    },

    createProject() {
      if (this.projectData.name && this.projectData.description) {
        const newProject = {
          id: Date.now(),
          name: this.projectData.name,
          description: this.projectData.description,
          tasks: [],
        };
        this.projects.push(newProject);
        localStorage.setItem('projects', JSON.stringify(this.projects));
        this.clearCreateProjectModal();
      }
    },

    openEditProjectModal(id) {
      Object.assign(this.editProjectData, this.projects.find(project => project.id === id))
      this.isEditProjectModalVisible = true;
    },

    clearEditProjectModal() {
      this.isEditProjectModalVisible = false;
    },

    editProject() {
      if (this.editProjectData.name && this.editProjectData.description) {
        const projectIndex = this.projects.findIndex(project => project.id === this.editProjectData.id);
        this.projects[projectIndex] = this.editProjectData;
        localStorage.setItem('projects', JSON.stringify(this.projects));
        this.clearEditProjectModal();
      }
    },

    openDeleteProjectModal(id) {
      this.deleteProjectId = id;
      this.isDeleteProjectModalVisible = true;
    },

    clearDeleteProjectModal() {
      this.deleteProjectId = null;
      this.isDeleteProjectModalVisible = false;
    },

    deleteProject() {
      this.projects = this.projects.filter(project => project.id !== this.deleteProjectId);
      localStorage.setItem('projects', JSON.stringify(this.projects));
      this.clearDeleteProjectModal();
    }
  },

  created() {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      this.projects = JSON.parse(savedProjects);
    }
  },
}
</script>

<style>
#dashboard_page {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 50px;
  height: 95%;
}

#dashboard_page_header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 24px;
  font-weight: 600;
}

#dashboard_page_content {
  max-height: 100%;
  overflow-y: auto;
  padding-right: 10px;
}

#dashboard_page_content::-webkit-scrollbar {
  width: 8px;
}

#dashboard_page_content::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

#dashboard_page_content::-webkit-scrollbar-thumb:hover {
  background-color: #aaa;
}

#dashboard_page_content::-webkit-scrollbar-track {
  background-color: #f0f0f0;
  border-radius: 4px;
}

#dashboard_header_title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: 600;
}

#dashboard_header_actions {
  margin-left: auto;
}

#dashboard_projects_list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dashboard_project_item {
  display: grid;
  grid-template-columns: 2fr 4fr 2fr 2fr;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  gap: 20px;
}

.dashboard_project_name,
.dashboard_project_description,
.dashboard_project_progress,
.dashboard_project_actions {
  display: flex;
  align-items: center;
  text-align: left;
}

.dashboard_project_actions {
  gap: 5px;
}
</style>