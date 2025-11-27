<template>
  <div id="msgCatalogo" v-if="showInfo">
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
      <div class="card p-2 shador" style="width: 250px;">
        <div class="d-flex justify-content-between align-items-center w-100 card-header">
          <div class="fs-5">Aviso <i class="fa-solid fa-circle-exclamation fs-6"></i></div>
          <div v-on:click="info()"><i class="fa-solid fa-xmark fs-6"></i></div>
        </div>

        <div class="text-secondary text-center">
          Necessário registrar um estabelecimento para desbloquear a área {{ msg }} 
        </div>
      </div>
    </div>
  </div>

  <main class="container" style="z-index: 1;">
    <!-- CARDS -->
    <div class="cards d-flex gap-2 flex-wrap justify-content-center align-items-center align-items-center">
      <!--  registro do estabelecimento -->
      <router-link :to="{name:'cadastro'}">
        <div class="card border-0 shadow p-2">
          <img src="img/estabelecimento.png" alt="ícone loja">
          <span>ESTABELECIMENTO</span>
        </div>
      </router-link>



      <!--  registro do estabelecimento -->
      <router-link :to="{name:'cadastro'}">
        <div class="card border-0 shadow p-2">
          <img src="img/pedidos.png" alt="ícone loja">
          <span>PEDIDOS</span>
        </div>
      </router-link>



      <!--  registro dos pratos -->
      <!-- {{ estabelecimentos.length }} -->
      <div v-if="estabelecimentos.length > 0">
        <router-link :to="{name:'catalogo'}">
          <div class="card border-0 shadow p-2">
            <img src="img/menu.png" alt="ícone loja">
            <span>CATÁLOGO</span>
          </div>
        </router-link>
      </div>
      <div v-else v-on:click="info('CATÁLOGO')">
        <div class="card border-0 shadow p-2" style="opacity: 0.5;">
          <img src="img/menu.png" alt="ícone loja">
          <span>CATÁLOGO</span>
        </div>
      </div>


      <!--  relatórios -->
      <router-link :to="{name:'cadastro'}">
        <div class="card border-0 shadow p-2">
          <img src="img/dashboard.png" alt="ícone loja">
          <span>RELATÓRIOS</span>
        </div>
      </router-link>
    </div>
  </main>
</template>






<script setup>
  //Firebase 
  import {ref, onMounted} from 'vue'
  import { DataSnapshot, onValue } from 'firebase/database'
  // Vuejs
  import { db, ref as dbRef, get, child } from '@/firebase'
  

  //===== Vartiáveis reativas =====
  let showInfo = ref(false)
  let msg = ref(null)

  let estabelecimentos = ref([])
  let loading = ref(true)
  let error = ref(null)




  // Exibindo aviso desbloquear módulo catálogo
  const info = (modulo)=>{
    showInfo.value = !showInfo.value
    msg.value = modulo
  }



  //===== Listando os estabelecimentos do firebase =====
  const listaEstabelecimentos = ()=>{
    const estabelecimentosRef = dbRef(db, 'estabelecimentos')

    // onValue vai escutar os dados em tempo real
    onValue(estabelecimentosRef, (DataSnapshot)=>{
      const data = DataSnapshot.val()
      if(data){
        // transforma o objeto do Firebase em array
        estabelecimentos.value = Object.entries(data).map(([id, info])=>({
          id,
          ...info
        }))
      }
      else{
        estabelecimentos.value = []
      }
      error.value = null
      loading.value = false
    })
  }




  // Executa ao montar o componente
  onMounted(()=>{
    listaEstabelecimentos()
  })
</script>





<style scoped>
  #msgCatalogo{
    background-color: rgba(0, 0, 0, 0.616);
    position: absolute;
    min-height: 100vh; 
    width: 100vw; 
    top:0; 
    bottom: 0; 
    z-index: 100;
  }


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
  div{
    color: rgb(61, 61, 61);
  }

  /* Estilo dos cards */
  .cards{
    max-width: 400px;
    margin: 0 auto;
  }
  .card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 150px;
  }


  /* Estilo das imagens */
  img{
    width: 50px;
  }
</style>
