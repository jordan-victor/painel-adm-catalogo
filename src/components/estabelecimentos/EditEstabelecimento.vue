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
                                <div
                                style="margin-top: -15px;"
                                class="text-center w-100" 
                                v-bind:class="estabelecimento.aberto ? 'text-success' : 'text-danger'"
                                >
                                    {{ estabelecimento.aberto ? 'Aberto' : 'Fechado' }}
                                </div>
                                
                                <div>
                                    <strong>Endereço:</strong> {{ estabelecimento.endereco}}
                                </div>

                                <div>
                                    <strong>Descrição:</strong> {{ estabelecimento.descricao}}
                                </div>
                                
                                <!-- Horários e dias -->
                                <div class="mt-3 overflow-x-scroll">
                                    <table class="table border">
                                        <thead style="background-color: gray;">
                                            <tr>                                                
                                                <th 
                                                class="text-secondary text-center" 
                                                v-bind:class="new Date().getDay() == 1 ? 'text-success' : ''">SEG</th>
                                                
                                                <th 
                                                class="text-secondary text-center"
                                                v-bind:class="new Date().getDay() == 2 ? 'text-success' : ''">TER</th>
                                                <th 
                                                class="text-secondary text-center"
                                                v-bind:class="new Date().getDay() == 3 ? 'text-success' : ''">QUA</th>

                                                <th 
                                                class="text-secondary text-center"
                                                v-bind:class="new Date().getDay() == 4 ? 'text-success' : ''">QUI</th>

                                                <th 
                                                class="text-secondary text-center"
                                                v-bind:class="new Date().getDay() == 5 ? 'text-success' : ''">SEX</th>

                                                <th 
                                                class="text-secondary text-center"
                                                v-bind:class="new Date().getDay() == 6 ? 'text-success' : ''">SÁB</th>

                                                <th class="text-secondary text-center"
                                                v-bind:class="new Date().getDay() == 0 ? 'text-success' : ''">DOM</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <!-- Horários de segunda -->
                                                <td class="border">                                                 
                                                    <div
                                                    v-if="estabelecimento.dias_func.find(d=>d.dia == 'segunda-feira')"
                                                    class="mb-2" 
                                                    v-for="(dia, i) in estabelecimento.dias_func.find(d=>d.dia == 'segunda-feira')?.horarios || []"
                                                    >
                                                        <div style="width: 40px; font-size: 13px; text-align: center; line-height: 1;">
                                                            {{ dia.horaIni }} às {{ dia.horaFim }}
                                                        </div>
                                                    </div>    
                                                    
                                                    <div v-else>
                                                        -
                                                    </div>                                                  
                                                </td>


                                                <!-- Horários de terça -->
                                                <td class="border">
                                                    <div
                                                    v-if="estabelecimento.dias_func.find(d=>d.dia == 'terça-feira')"
                                                    class="mb-2" 
                                                    v-for="(dia, i) in estabelecimento.dias_func.find(d=>d.dia == 'terça-feira')?.horarios || []"
                                                    >
                                                        <div style="width: 40px; font-size: 13px; text-align: center; line-height: 1;">
                                                            {{ dia.horaIni }} às {{ dia.horaFim }}
                                                        </div>
                                                    </div>

                                                    <div v-else>
                                                        -
                                                    </div>
                                                </td>
                                                

                                                <!-- Horários de quarta -->
                                                <td 
                                                v-bind:class="new Date().getDay() == 3 ? 'border-success' : 'border'"
                                                >
                                                    <div
                                                    v-if="estabelecimento.dias_func.find(d=>d.dia == 'quarta-feira')"
                                                    class="mb-2" 
                                                    v-for="(dia, i) in estabelecimento.dias_func.find(d=>d.dia == 'quarta-feira')?.horarios || []"
                                                    >
                                                        <div style="width: 40px; font-size: 13px; text-align: center; line-height: 1;">
                                                            {{ dia.horaIni }} às {{ dia.horaFim }}
                                                        </div>
                                                    </div>

                                                    <div v-else>
                                                        -
                                                    </div>
                                                </td>


                                                <!-- Horários de quinta -->
                                                <td class="border">
                                                    <div
                                                    v-if="estabelecimento.dias_func.find(d=>d.dia == 'quinta-feira')"
                                                    class="mb-2" 
                                                    v-for="(dia, i) in estabelecimento.dias_func.find(d=>d.dia == 'quinta-feira')?.horarios || []"
                                                    >
                                                        <div style="width: 40px; font-size: 13px; text-align: center; line-height: 1;">
                                                            {{ dia.horaIni }} às {{ dia.horaFim }}
                                                        </div>
                                                    </div>

                                                    <div v-else>
                                                        -
                                                    </div>
                                                </td>


                                                <!-- Horários de sexta -->
                                                <td class="border">
                                                    <div
                                                    v-if="estabelecimento.dias_func.find(d=>d.dia == 'sexta-feira')"
                                                    class="mb-2" 
                                                    v-for="(dia, i) in estabelecimento.dias_func.find(d=>d.dia == 'sexta-feira')?.horarios || []"
                                                    >
                                                        <div style="width: 40px; font-size: 13px; text-align: center; line-height: 1;">
                                                            {{ dia.horaIni }} às {{ dia.horaFim }}
                                                        </div>
                                                    </div>

                                                    <div v-else>
                                                        -
                                                    </div>
                                                </td>


                                                <!-- Horários de sábado -->
                                                <td class="border">
                                                    <div
                                                    v-if="estabelecimento.dias_func.find(d=>d.dia == 'sábado')"
                                                    class="mb-2" 
                                                    v-for="(dia, i) in estabelecimento.dias_func.find(d=>d.dia == 'sábado')?.horarios || []"
                                                    >
                                                        <div style="width: 40px; font-size: 13px; text-align: center; line-height: 1;">
                                                            {{ dia.horaIni }} às {{ dia.horaFim }}
                                                        </div>
                                                    </div>

                                                    <div v-else>
                                                        -
                                                    </div>
                                                </td>


                                                <!-- Horários de sábado -->
                                                <td class="border">
                                                    <div
                                                    v-if="estabelecimento.dias_func.find(d=>d.dia == 'domingo')"
                                                    class="mb-2" 
                                                    v-for="(dia, i) in estabelecimento.dias_func.find(d=>d.dia == 'domingo')?.horarios || []"
                                                    >
                                                        <div style="width: 40px; font-size: 13px; text-align: center; line-height: 1;">
                                                            {{ dia.horaIni }} às {{ dia.horaFim }}
                                                        </div>
                                                    </div>

                                                    <div v-else>
                                                        -
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="px-3 d-flex gap-1 mb-2">
                            <button class="btn bg-success "><i class="fa-solid fa-pen-to-square text-white"></i></button>
                            <button class="btn bg-danger "><i class="fa-solid fa-delete-left text-white"></i></button>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        
        <div v-else class="w-100 text-center">
            Sem estabelecimentos cadastrados
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

    let diaHj = ref(new Date().toLocaleDateString('pt-BR', {weekday:'long'}))
   


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
                // Dia da semana de hoje
                const agora = new Date()

                let diaSemHoje = new Date().getDay()
                if (diaSemHoje === 0) {
                    diaSemHoje = "domingo"
                } else if (diaSemHoje === 1) {
                    diaSemHoje = "segunda-feira"
                } else if (diaSemHoje === 2) {
                    diaSemHoje = "terça-feira"
                } else if (diaSemHoje === 3) {
                    diaSemHoje = "quarta-feira"
                } else if (diaSemHoje === 4) {
                    diaSemHoje = "quinta-feira"
                } else if (diaSemHoje === 5) {
                    diaSemHoje = "sexta-feira"
                } else if (diaSemHoje === 6) {
                    diaSemHoje = "sábado"
                }


                setInterval(()=>{
                    console.log("oiii")
                    let horaAgora = new Date().getHours() * 60 + new Date().getMinutes()
                    // horaAgora = 10*60 + 1
                    
                    // Comparando horários do dia de hoje para verificar se o etsbelecimento está aberto ou não
                    estabelecimentos.value.forEach(estabelecimento=>{
                        var aberto = false

                        estabelecimento.dias_func.forEach(dia_func=>{
                            // Se o dia da semana for igual a uns dos dias da semana do estabelecimento
                            if(dia_func.dia == diaSemHoje){
                                // Comparando hora´rio agora com os horários de funcionamento
                                dia_func.horarios.forEach((horario, i)=>{
                                    // Hora e minuto (início e fim) do estabelecimento hoje
                                    var horaIni = Number(horario.horaIni.split(':')[0])*60 + Number(horario.horaIni.split(':')[1])                                
                                    var horaFim = Number(horario.horaFim.split(':')[0])*60 + Number(horario.horaFim.split(':')[1])
                                console.log(horaIni + "-" + horaAgora + "-" +horaFim)

                                    // Se existir um próximo intervalo de horários    
                                    if(horaAgora >= horaIni && horaAgora <= horaFim){
                                        aberto = true
                                        return aberto
                                    }                                                                         
                                })
                            }
                        })

                        console.log(aberto)
                        estabelecimento.aberto = aberto
                    })
                }, 1000)   
                
                

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

                    var horaAtual = ref(new Date().toLocaleTimeString('pt-BR', horaLocal)) 
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