<template>
    <div class="card">
        <header class="card-header">     
            <div>Estabelecimentos cadastrados</div>        
        </header>

    
        <div class="cardsEstab d-flex gap-2 flex-wrap card-body">
            <template v-for="(estabelecimento, i) in estabelecimentos">
                <div class="card cardEstab shadow" style="max-width: 250px; cursor: pointer;">
                    <h5 class="card-header">{{ estabelecimento.nome_empresa}}</h5>
                    <div class="card-body">
                        <div>
                            <strong><i class="fa-solid fa-house"></i>Endereço:</strong> {{ estabelecimento.endereco}}
                        </div>
                        <div>
                            <strong><i class="fa-solid fa-info"></i>Descrição:</strong> {{ estabelecimento.descricao}}
                        </div>
                    </div>
                </div>
            </template>
        </div>
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



<style scoped>
    .cardEstab{
       transition: 0.2s all ease-in-out; 
    }

    .cardEstab:hover{
        transform: scale(1.03);
    }
</style>