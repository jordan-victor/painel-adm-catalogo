<script setup>
    // Vuejs
    import {ref, onMounted, nextTick} from 'vue'

    //Firebase 
    import { DataSnapshot, onValue } from 'firebase/database'
    import { db, ref as dbRef, get, child, set, push} from '@/firebase'
    // Datatables para filtro da tabela de produtos
    import $ from 'jquery'
    // import 'datatables.net-dt/css/jquery.dataTables.css'
    import 'datatables.net-dt'

    // Variáveis reativas
    let produtos = ref([])
    let tabela = null


    //===== Listando produtos do firebase =====
    const listaProdutos = async()=>{
        const produtosRef = dbRef(db, 'produtos')

        // onValue vai escutar os dados em tempo real
        onValue(produtosRef, (DataSnapshot)=>{
        const data = DataSnapshot.val()
        if(data){
            // transforma o objeto do Firebase em array
            produtos.value = Object.entries(data).map(([id, info])=>({
            id,
            ...info
            }))
        }
        else{
            produtos.value = []
        }
        


        // Datatables
        if (tabela) {
        // Atualiza os dados da tabela sem recriar
        tabela.clear().destroy() // destrói a instância antiga
        }

        // Cria novamente o DataTable com os novos dados
        tabela = $('#tabelaProdutos').DataTable({
            pageLength: 5,
            dom: 't<"bottom"p>',
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json'
            }
        })

        // 🔹 Filtro por nome (coluna 0 = "Nome")
        $('#nm_prod').off('keyup').on('keyup', function () {
            tabela.column(0).search(this.value).draw()
        })

         $('#disponivel').off('change').on('', function () {
            tabela.column(5).search(this.value).draw()
        })

        })


        
    }




    onMounted(()=>{
        listaProdutos()
       
    })
</script>










<template>
    <main class="container">
        <header class="mb-3">
            <h1 class="text-center text-secondary">Lista de produtos</h1>    
        </header>
        

        <div class="card p-2">
            <!-- Campo de filtro -->
            <div class="d-flex gap-2 flex-wrap card-header">
                <div>
                    <label for="nm_prod">Nome</label>
                    <div>
                        <input type="text" id="nm_prod" placeholder="Pesquisar..." class="form-control">
                    </div>
                </div>
                <div>
                    <label for="categoria">Categoria</label>
                    <div>
                        <select id="categoria" class="form-select">
                            <option>Selecionar</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label for="disponivel">Disponível</label>
                    <div>
                        <select id="disponivel" class="form-select">
                            <option>Selecionar</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label for="estabelecimento">Local de venda</label>
                    <div>
                        <select id="estabelecimento" class="form-select">
                            <option>Selecionar</option>
                        </select>
                    </div>
                </div>
            </div>


            <!-- Tabela -->
            <div>
                <table class="table" id="tabelaProdutos">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th class="text-center">Categoria</th>
                            <th class="text-center">Preço</th>
                            <th class="text-center">Tamanho</th>
                            <th>Descrição</th>
                            <th class="text-center">Disponível</th>
                            <th>Local de venda</th>
                            <th class="text-center">Editar</th>
                            <th class="text-center">Deletar</th>
                        </tr>
                    </thead>

                    <tbody>
                        <template v-for="produto in produtos">
                            <tr>
                                <td>{{produto.nome}}</td>
                                <td class="text-center">{{produto.categoria}}</td>
                                <td class="text-center">{{produto.preco}}</td>
                                <td class="text-center">{{produto.proporcao}}</td>
                                <td>{{produto.descricao}}</td>
                                <td class="text-center">{{produto.disponivel == 'on' ? 'Sim' : 'Não'}}</td>
                                <td>{{produto.estabelecimento}}</td>
                                <td>
                                    <button class="btn bg-light text-success shadow"><i class="fa-solid fa-pen-to-square"></i></button>
                                </td>
                                <td>
                                    <button class="btn bg-light text-danger shadow"><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        </template>
                    </tbody>                  
                </table>
            </div>
        </div>
    </main>
</template>



<style scoped>
</style>