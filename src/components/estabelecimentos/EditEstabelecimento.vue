<template>
    <header class="mb-3 mt-3">     
        <div>Estabelecimentos cadastrados</div>
        <hr>         
    </header>

   
   <div class="cardsEstab d-flex gap-2 flex-wrap">
        <template v-for="(estabelecimento, i) in estabelecimentos">
            <div class="card" style="width: 200px;">
                <h4 class="card-header">{{ estabelecimento.nome_empresa}}</h4>
                <div><i class="fa-solid fa-house"></i> Endereço:<br> {{ estabelecimento.endereco}}</div>
            </div>
        </template>
   </div>
</template>



<script setup>
    import { ref, reactive, onMounted } from "vue";

    import { DataSnapshot, onValue } from 'firebase/database'
    import { db, ref as dbRef, get, child, set, push} from '@/firebase'


    const estabelecimentos = ref([])
    

    const listaEstabelecimentos = async()=>{
        const estabelecimentoRef = dbRef(db, 'estabelecimentos')

        // onValue vai escutar os dados em tempo real
        onValue(estabelecimentoRef, (DataSnapshot)=>{
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
        })
    }


    onMounted(()=>{
        listaEstabelecimentos()
    })  
</script>