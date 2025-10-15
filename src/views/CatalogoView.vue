<script setup>
    // import {ref as vueRef, reactive, onMounted} from 'vue'
    // import { Database, ref, onValue } from 'firebase/database';

    // const estabelecimentos = vueRef([])

    // onMounted(()=>{
        
    // })
</script>



<template>
    <main class="container-lg">
        <header class="d-flex justify-content-center align-items-center gap-1 mb-2">
            <img src="img/menu.png" alt="ícone loja" width="30px">
            <h4 class="mt-3">CATÁLOGO</h4>
        </header>

        <form class="cadastro">
            <!-- Informações das opções do menú -->
            <div class="d-flex flex-column gap-3 flex-wrap">
                <!-- Estabelecimento -->
                <fieldset class="d-flex flex-wrap flex-column gap-2 mb-2 p-2 border">
                    <div class="text-start bg-light"><strong>Estabelecimento</strong></div>


                    <div class="inputsContainer w-100">
                        <div class="text-start">Estabelecimento<span class="text-danger">*</span></div>
                        <select id="estabelecimento" class="form-select" required>
                            <option>Selecionar</option>
                        </select>
                    </div>
                </fieldset>




                <!-- Categoria -->
                <fieldset class="d-flex flex-wrap flex-column gap-2 mb-2 p-2 border">
                    <div class="text-start bg-light"><strong>Cadastrar categoria</strong></div>


                    <div class="inputsContainer w-100">
                        <div class="text-start">Categoria<span class="text-danger">*</span></div>
                        <input type="text" class="form-control" id="categoria" placeholder="Nome da categoria" required>
                    </div>
                </fieldset>




                <!-- prato -->
                <fieldset class="d-flex flex-wrap flex-column gap-2 mb-2 p-2 border">
                    <div class="text-start bg-light"><strong>Prato</strong></div>

                    <div class="inputsContainer w-100">
                        <div class="text-start">Nome<span class="text-danger">*</span></div>
                        <input type="text" class="form-control" id="nome_prato" required placeholder="Opção do catálogo">
                    </div>


                    <div class="inputsContainer w-100">
                        <div class="text-start">Categoria<span class="text-danger">*</span></div>
                        <select id="categ_select" class="form-select" required>
                            <option>Selecionar</option>
                        </select>
                    </div>


                    <div class="inputsContainer w-100">
                        <div class="text-start">Imagem</div>
                        <input type="file" name="imagem" class="form-control" id="imagem">
                    </div>


                    <div class="inputsContainer w-100">
                        <div class="text-start">Disponível<span class="text-danger">*</span></div>

                        <div class="d-flex gap-2 border form-control">
                            <div class="d-flex gap-1">
                                <input type="radio" name="disponivel" id="sim" checked>
                                <label for="sim">Sim</label>
                            </div>
                            <div class="d-flex gap-1">
                                <input type="radio" name="disponivel" id="nao">
                                <label for="nao">Não</label>
                            </div>
                        </div>
                        <!-- <select id="disponivel" class="form-select" required>
                            <option>Selecionar</option>
                        </select> -->
                    </div>


                    <div>
                        <div class="text-start">Descrição<span class="text-danger">*</span></div>
                        <input type="text" name="descricao" id="descricao" class="form-control" placeholder="Descreva a receita" required>
                    </div>


                    <div class="inputsContainer w-100">
                        <div class="text-start">Preço<span class="text-danger">*</span></div>
                        <input type="number" class="form-control" id="preco" placeholder="R$" required>
                    </div>


                    <div class="inputsContainer w-100">
                        <div class="text-start">Tamanho/Porção<span class="text-danger">*</span></div>
                        <input type="text" class="form-control" id="tamnhoPorcao" placeholder="EX: 500g, 1L, Grande" required>
                    </div>
                </fieldset>
            </div>


            <div class="d-flex flex-start">
                <button class="btn bg-secondary text-white">Adicionar</button>    
            </div>          
        </form>
    </main>
</template>


<style scoped>
     /* Estilo das fontes */
    label{
      color: rgb(59, 59, 59);
    }
    div{
      color: rgb(59, 59, 59);  
    }


    label{
        margin-left: 0px;
    }
    button{
        width: 100px;
    }

    /* Estilo dos inputs */
    .inputsContainer{
        min-width: 100px;
        flex: 1;    
    }
    input[type='text']{     
        width: 100%;    
    }
    input[type='number']{     
        width: 100%;    
    }
    select{
        width: 100%;
    }
</style>