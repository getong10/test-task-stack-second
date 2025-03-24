<template>
  <div id="project_page">
    <div id="project_page_header">
      <div id="project_header_title">Информация о проекте</div>
      
      <div id="project_header_actions">
        <base-select :id="'project_input'" :options="this.projects" @onSelect="onSelectProject">Выберите проект</base-select>
      </div>
    </div>

    <div id="project_page_content" v-if="selectedProject">
      <div id="project_info">
        <span id="project_info_name">Проект: {{ this.selectedProject.name }}</span>
        <span id="project_info_description">Описание проекта: {{ this.selectedProject.description }}</span>
      </div>

      <div id="project_tasks">
        <div id="project_tasks_header">
          <div id="project_tasks_title">Задачи проекта</div>

          <div id="project_task_actions">
            <base-button :id="'create_button'" @click="openCreateTaskModal">Создать задачу</base-button>
          </div>
        </div>

        <div id="project_tasks_list">
          <div id="project_task_column" v-for="status in taskStatuses" :key="status">
            <div id="task_column_header">{{ status }}</div>

            <div id="task_column_content">
              <div id="task_item" v-for="task in filteredTasks(status)" :key="task.id">
                <task-component :task="task" @edit="getTaskEditModal" @delete="openDeleteTaskModal"></task-component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <dialog-view v-if="isCreateTaskModalVisible">
      <template v-slot:dialog_header>
        <div>Создание задачи</div>
        <base-button :id="'close_button'" @click="clearCreateTaskModal">X</base-button>
      </template>

      <template v-slot:dialog_content>
        <base-input v-model="taskData.name" :id="'project_input'" :placeholder="'Название задачи'"></base-input>
        <base-textarea v-model="taskData.description" :id="'project_textarea'" :placeholder="'Описание задачи'"></base-textarea>
        <base-select v-model="taskData.status" :id="'project_select'" :options="taskStatuses">Статус задачи</base-select>
      </template>

      <template v-slot:dialog_actions>
        <base-button :id="'create_button'" @click="createTask">Создать</base-button>
      </template>
    </dialog-view>

    <dialog-view v-if="isDeleteTaskModalVisible">
      <template v-slot:dialog_header>
        <div>Удалить задачу?</div>
        <base-button :id="'close_button'" @click="clearDeleteTaskModal">X</base-button>
      </template>

      <template v-slot:dialog_actions>
        <base-button :id="'delete_button'" @click="deleteTask">Удалить</base-button>
        <base-button :id="'cancel_button'" @click="clearDeleteTaskModal">Отмена</base-button>
      </template>
    </dialog-view>

    <component
      :is="selectedTaskDialog"
      v-if="selectedTaskDialog"
      :task="selectedTask"
      @save="editTask"
      @toProcess="editTask"
      @toReview="editTask"
      @toComplete="editTask"
      @close="closeEditTaskModal"
    />
  </div>
</template>

<script>
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import TaskComponent from '@/components/tasks/TaskComponent.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseTextarea from '@/components/ui/BaseTextarea.vue';
import DialogView from '@/views/DialogView.vue';
import inProgressTaskEditDialog from '@/components/tasks/dialogs/inProgressTaskEditDialog.vue';
import inReviewTaskEditDialog from '@/components/tasks/dialogs/inReviewTaskEditDialog.vue';
import completedTaskEditDialog from '@/components/tasks/dialogs/completedTaskEditDialog.vue';

export default {
  name: 'ProjectPage',
  components: {
    BaseSelect,
    BaseButton,
    TaskComponent,
    BaseInput,
    BaseTextarea,
    DialogView,
    inProgressTaskEditDialog,
    inReviewTaskEditDialog,
    completedTaskEditDialog,
  },
  data() {
    return {
      projects: [],
      selectedProject: null,
      selectedTask: null,
      selectedTaskDialog: null,
      taskStatuses: ['В работе', 'На проверке', 'Завершено'],
      taskData: {
        name: '',
        description: '',
        status: '',
      },
      taskForDelete: null,
      isCreateTaskModalVisible: false,
      isDeleteTaskModalVisible: false,
      isEditTaskModalVisible: false,
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

    filteredTasks(status) {
      return this.selectedProject.tasks.filter(task => task.status === status);
    },

    openCreateTaskModal() {
      this.isCreateTaskModalVisible = true;
    },

    clearCreateTaskModal() {
      this.taskData = {
        name: '',
        description: '',
        status: '',
      }
      this.isCreateTaskModalVisible = false;
    },

    createTask() {
      console.log(this.taskData)
      if (this.taskData.name && this.taskData.description && this.taskData.status) {
        const newTask = {
          id: Date.now(),
          name: this.taskData.name,
          description: this.taskData.description,
          status: this.taskData.status,
        };
        this.selectedProject.tasks.push(newTask);
        localStorage.setItem('projects', JSON.stringify(this.projects));
        this.clearCreateTaskModal();
      }
    },

    getTaskEditModal(task) {
      this.selectedTask = task;
      const taskDialogs = {
        'В работе': inProgressTaskEditDialog,
        'На проверке': inReviewTaskEditDialog,
        'Завершено': completedTaskEditDialog,
      };
      this.selectedTaskDialog = taskDialogs[task.status] || inProgressTaskEditDialog;
    },

    clearDeleteTaskModal() {
      this.taskForDelete = null
      this.isDeleteTaskModalVisible = false;
    },

    openDeleteTaskModal(task) {
      this.isDeleteTaskModalVisible = true;
      this.taskForDelete = task
    },

    deleteTask() {
      this.selectedProject.tasks = this.selectedProject.tasks.filter(task => task.id !== this.taskForDelete)
      const index = this.projects.findIndex(project => project.name === this.selectedProject.name)
      this.projects[index].tasks = this.selectedProject.tasks
      localStorage.setItem('projects', JSON.stringify(this.projects));
      this.clearDeleteTaskModal()
    },

    editTask(updatedTask) {
      const indexTask = this.selectedProject.tasks.findIndex(task => task.id === updatedTask.id);
      this.selectedProject.tasks[indexTask] = updatedTask;

      const indexProject = this.projects.findIndex(project => project.name === this.selectedProject.name)
      this.projects[indexProject].tasks = this.selectedProject.tasks

      localStorage.setItem('projects', JSON.stringify(this.projects));
      this.selectedTaskDialog = null;
    },

    closeEditTaskModal() {
      this.selectedTaskDialog = null;
      this.selectedTask = null;
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
  height: 95%;
}

#project_page_header, #project_tasks_header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 24px;
  font-weight: 600;
}

#project_page_content {
  max-height: 100%;
  overflow-y: auto;
  padding-right: 10px;
}

#project_page_content::-webkit-scrollbar {
  width: 8px;
}

#project_page_content::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

#project_page_content::-webkit-scrollbar-thumb:hover {
  background-color: #aaa;
}

#project_page_content::-webkit-scrollbar-track {
  background-color: #f0f0f0;
  border-radius: 4px;
}

#project_header_title,
#project_tasks_title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: 600;
}

#project_header_actions,
#project_task_actions {
  margin-left: auto;
}

#project_info {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
}

#project_info_name {
  font-size: 24px;
  font-weight: 400;
}

#project_info_description {
  font-size: 16px;
  font-weight: 400;
}

#project_tasks {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#project_tasks_title {
  font-size: 16x;
  font-weight: 400;
}

#project_tasks_list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

#task_column_content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#project_task_column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#task_column_header {
  font-size: 18px;
  font-weight: 400;
}
</style>