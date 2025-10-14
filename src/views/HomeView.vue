<template>
  <main class="container">
    <!-- CARDS -->
    <div class="cards d-flex gap-2 flex-wrap justify-content-center align-items-center align-items-center">
      <!--  registro do estabelecimento -->
      <router-link :to="{name:'cadastro'}">
        <div class="card border-0 shadow p-2">
          <img src="img/estabelecimento.png" alt="ícone loja">
          <span>LOJA</span>
        </div>
      </router-link>



      <!--  registro do estabelecimento -->
      <router-link :to="{name:'cadastro'}">
        <div class="card border-0 shadow p-2">
          <img src="img/pedidos.png" alt="ícone loja">
          <span>PEDIDOS</span>
        </div>
      </router-link>



      <!--  registro do estabelecimento -->
      <router-link :to="{name:'catalogo'}">
        <div class="card border-0 shadow p-2">
          <img src="img/menu.png" alt="ícone loja">
          <span>CATÁLOGO</span>
        </div>
      </router-link>



      <!--  registro do estabelecimento -->
      <router-link :to="{name:'cadastro'}">
        <div class="card border-0 shadow p-2">
          <img src="img/dashboard.png" alt="ícone loja">
          <span>RELATÓRIOS</span>
        </div>
      </router-link>
    </div>
  </main>
</template>






<script>
export default {
    name: 'HomeView',
  }
</script>





<style scoped>
  /* Estilo das fontes */
  span{
    text-decoration: none;
    line-height: 20px;
    color: rgb(61, 61, 61);
    text-decoration: none;
  }
  a{
    text-decoration: none;
  }
  i{
    color: rgb(61, 61, 61);
    font-size: 35px;
  }

  /* Estilo dos cards */
  .cards{
    max-width: 250px;
    margin: 0 auto;
  }
  .card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 120px;
  }


  /* Estilo das imagens */
  img{
    width: 50px;
  }
</style>
