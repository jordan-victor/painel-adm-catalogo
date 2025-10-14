<template> 
  <header class="mb-4">
    <div>
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-secondary bg-light">
        <div class="container">
          <!-- Logo / Nome -->
          <router-link class="navbar-brand fw-bold" to="/">LOGO</router-link>

          <!-- Botão Hamburguer (visível em telas pequenas) -->
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuNavbar" aria-controls="menuNavbar" aria-expanded="false" aria-label="Alternar navegação">
            <span class="navbar-toggler-icon"></span>
          </button>

          <!-- Itens da Navbar -->
          <div class="collapse navbar-collapse" id="menuNavbar">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link active" aria-current="page" to="/">Início</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Serviços</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Sobre</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Contato</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav> -->
    </div>
  </header>

  <router-view/>

  <!-- <footer>
    <hr>
    <div>
      {{ new Date().getFullYear() }}
    </div>
  </footer>  -->
</template>

<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 10px 10px 20px 10px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  /* nav a.router-link-exact-active {
    color: #42b983;
  } */
</style>
