<template>
  <h1 class="app-name">Vue To-Do List App 📱</h1>
</template>

<style scoped>
.app-name {
  font-weight: 500;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
  text-align: center;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
