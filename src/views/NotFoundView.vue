<template>
    <div class="not-found">
      <div class="container">
        <div class="number">404</div>
        <div class="text">Oops! Page not found</div>
        <div class="subtext">The page you are looking for might have been removed or is temporarily unavailable.</div>
        <router-link to="/" class="back-link">Back to Home</router-link>
      </div>
    </div>
  </template>
  
  <style scoped>
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .container {
    text-align: center;
    padding: 2rem;
    border-radius: 10px;
  }
  
  .number {
    font-size: 6rem;
    font-weight: bold;
    color: #e74c3c;
  }
  
  .text {
    font-size: 2rem;
    font-weight: bold;
    margin-top: 0.5rem;
    color: #707070;
  }
  
  .subtext {
    font-size: 1rem;
    margin-top: 0.5rem;
    color: #777;
  }
  
  .back-link {
    display: inline-block;
    margin-top: 1rem;
    color: #3498db;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;
  }
  
  .back-link:hover {
    color: #258cd1;
  }
  </style>
  