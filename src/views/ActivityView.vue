<script setup>
import { ref } from 'vue'
import { useListStore } from '@/stores/lists'
import BaseInput from '../components/BaseInput.vue';

// store container
const store = useListStore()

// initial input / default input
const defaultInput = {
  name: '',
  hobby: '',
  description: '',
  completed: false
}

// ref input
// spread syntax
const input = ref({ ...defaultInput })
const editing = ref(false)

// function reset form
const resetForm = () => {
  Object.assign(input.value, defaultInput)
  editing.value = false
}

// function yg menerima submit form
function onSubmit() {
  // event.preventDefault();
  const data = { ...input.value }

  if (editing.value === false) {
    // add list via store
    store.addList(data)
  } else {
    // edit list
    store.editList(editing.value, data)
  }

  // reset form
  resetForm()
}

function detailList(index) {
  const detail = store.getDetail(index)
  input.value = { ...detail.value }
  editing.value = index
}

function toggleCompleted(index) {
  const listCompleted = store.getDetail(index)
  listCompleted.value.completed = !listCompleted.value.completed
}
</script>

<template>
  <div class="container">
    <!-- <h1>Test {{ $route.params?.id }}</h1> -->
    <!-- add v-model to integrate data binding with ref -->
    <!-- add event handler listener when keyup enter delete -->
    <!-- method handler with addList function -->
    <!-- event modifier .enter, .prevent -->
    <form class="form" @submit.prevent="onSubmit" @reset="resetForm">
      <BaseInput v-model="input.name" id="name" name="Name" placeholder="John" required />
      <BaseInput
        v-model="input.hobby"
        id="hobby"
        name="Hobby"
        placeholder="Gaming"
        required
      />
      <BaseInput
        v-model="input.description"
        id="description"
        name="Description"
        placeholder="Everyday"
      />
      <div class="button-action">
        <button class="button-cancel" type="reset">Cancel</button>
        <button class="button-submit" type="submit">{{ editing !== false ? 'Save' : 'Submit' }}</button>
      </div>
    </form>

    
    <table class="list">
      <thead>
        <th>No.</th>
        <th>Name</th>
        <th>Hobby</th>
        <th>Activity</th>
        <th>Action</th>
        <th>Toggle</th>
      </thead>
      <template v-for="(item, index) in store.getList" :key="index">
        <!-- (item, index) -->
        <tbody>
          <tr>
            <td @dblclick="() => toggleCompleted(index)" :class="{ strike: item.completed }">
              {{ index + 1 }}
            </td>
            <td @dblclick="() => toggleCompleted(index)" :class="{ strike: item.completed }">
              {{ item?.name }}
            </td>
            <td @dblclick="() => toggleCompleted(index)" :class="{ strike: item.completed }">
              {{ item?.hobby }}
            </td>
            <!-- null chaining (?.), nullish coalescing (??); ternary operator; not operator -->
            <td @dblclick="() => toggleCompleted(index)" :class="{ strike: item.completed }">
              {{ !!item?.description ? item.description : 'description?' }}
            </td>
            <td class="action-button">
              <button
                class="red"
                @click="() => store.removeList(index)"
                :disabled="editing !== false"
              >
              Delete <ion-icon name="trash-bin" class="cutom-icon"></ion-icon>
              </button>
              <button class="orange" @click="() => detailList(index)" :disabled="editing !== false">
                Edit &#9998;
              </button>
            </td>
            <td>
              <button class="button-completed" @dblclick="() => toggleCompleted(index)"><ion-icon name="checkbox" class="custom-icon"></ion-icon></button>
            </td>
          </tr>
        </tbody>
      </template>
    </table>
  </div>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  .button-action {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-bottom: 1rem;
    .button-submit {
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.3rem;
      cursor: pointer;
      background: linear-gradient(to right, #016d2c, #00ac45);
      border: none;
      outline: none;
      color: #fff;
      font-weight: 500;
    }

    .button-submit:hover {
      box-shadow: 0 0 5px rgb(0, 255, 0);
    }

    .button-cancel {
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.3rem;
      cursor: pointer;
      background: linear-gradient(to right, #54016d, #9800ac);
      border: none;
      outline: none;
      color: #fff;
      font-weight: 500;
    }

    .button-cancel:hover {
      box-shadow: 0 0 5px rgb(247, 0, 255);
    }
  }
}

.list {
  width: 100%;

  .strike {
    text-decoration: line-through;
    text-decoration-color: #FFFF;
    text-decoration-thickness: 5px;
  }

  th,
  td {
    padding: 0.5rem;
    text-align: left;
    border-bottom: 1px solid #c4c3c3;
  }

  th {
    background-color: #424242;
    font-weight: bold;
  }
  .action-button {
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
    .red {
      padding: 0.5rem;
      border-radius: 0.3rem;
      cursor: pointer;
      background-color: red;
      color: white;
      border: none;
      outline: none;
    }

    .orange {
      padding: 0.5rem;
      border-radius: 0.3rem;
      cursor: pointer;
      background-color: orange;
      color: white;
      border: none;
      outline: none;
    }
  }
  .button-completed {
    padding: 0.3rem;
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
  }

  ion-icon.custom-icon {
  font-size: 20px;
  color: #00ac45;
  }
}
</style>
