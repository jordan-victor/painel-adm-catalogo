<template>
    {{horaAtual}}
    <div class="card">
        <header class="card-header">     
            <div>Estabelecimentos cadastrados</div>        
        </header>

        
        <div class="cardsEstab card-body row" v-if="estabelecimentos.length > 0">
            <template v-for="(estabelecimento, i) in estabelecimentos">
                <div class="col-12 col-sm-6 col-md-4 mb-3">
                    <div class="card cardEstab h-100 d-flex flex-column justify-content-between" style="cursor: pointer;">
                        <div>
                            <h5 class="card-header">{{ estabelecimento.nome_empresa}}</h5>
                            <div class="card-body">
                                <div>
                                    <strong>Endereço:</strong> {{ estabelecimento.endereco}}
                                </div>

                                <div>
                                    <strong>Descrição:</strong> {{ estabelecimento.descricao}}
                                </div>           
                            </div>
                        </div>

                        <div class="px-3 d-flex gap-1 mb-2">
                            <button class="btn bg-success text-white"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="btn bg-danger text-white"><i class="fa-solid fa-delete-left"></i></button>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        
        <div v-else class="w-100">
            <span class="text-center">Sem estabelecimentos cadastrados</span>
        </div>
   </div>
</template>



<script setup>
    import { ref, reactive, onMounted } from "vue";

    import { DataSnapshot, onValue } from 'firebase/database'
    import { db, ref as dbRef, get, child, set, push} from '@/firebase'

    // Array de estabelecikentos
    const estabelecimentos = ref([])

    // Dias da semana e dia hoje
    let diasSemana = [
        'domingo', 
        'segunda-feira', 
        'terça-feira',
        'quarta-feira',
        'quinta-feira',
        'sexta-feira',
        'sábado'
    ]

    let diaHj = ref(new Date().toLocaleDateString(undefined, {weekday:'long'}))
   


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




                //=====VERIFICANDO SE O ESTABELECIMENTO ESTÁ ABERTO OU NÃO NO DIA ATUAL=====
                // atualiza o dia de hoje a cada uma hora
                
                    let diaSemHoje = new Date().toLocaleDateString(undefined, {weekday:'long'})
                    
                    
                    estabelecimentos.value.forEach(estabelecimento=>{
                        estabelecimento.dias_func.forEach(dia_func=>{
                            if(dia_func.dia == diaSemHoje){
                                // Comparando hora´rio agora com os horários de funcionamento
                                dia_func.horarios.forEach(horario=>{
                                    console.log(new Date(horario.horaIni))
                                })
                            }
                        })
                    })
                   
                
                

                // Formatando datas para a região local
                setInterval(()=>{
                    const opcoes = {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        timeZoneName: 'short' 
                    };  

                    var horaLocal = {
                        hour:'numeric',
                        minute:'numeric'
                    }

                    var horaAtual = ref(new Date().toLocaleTimeString(undefined, horaLocal)) 
                }, 1000)
            }
            else{
                estabelecimentos.value = []
                dadosCarregados.value = false
            }
        })
       
      

        
    }


    onMounted(()=>{
        listaEstabelecimentos()
    })  
</script>



<style scoped>
    *{
        color: rgb(92, 92, 92);
    }
    .cardEstab{
       transition: 0.2s all ease-in-out; 
    }

    .cardEstab:hover{
        transform: scale(1.03);
        box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.068);
    }
</style>