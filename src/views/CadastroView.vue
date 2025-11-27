
<template>
    <main class="container-lg">
        <header class="d-flex justify-content-center align-items-center gap-1 mb-2">
            <img src="img/estabelecimento.png" alt="ícone loja" width="30px">
            <h4 class="mt-3">ESTABELECIMENTOS</h4>
        </header>

        
        <nav class="d-flex gap-2">
            <div 
            class="bg-light p-2" 
            v-bind:class="{border:showComponent}" 
            style="border-radius: 8px 8px 0px 0px;"
            @click="showComponent = !showComponent"
            >
            Cadastrar
            </div>

            <div 
            class="bg-light p-2" 
            v-bind:class="{border:!showComponent}" 
            style="border-radius: 8px 8px 0px 0px;"
            @click="showComponent = !showComponent"
            >
            Editar
            </div>
        </nav>
       




        <div>
            <!-- Formulário de cadastro -->
            <form class="cadastro" @submit.prevent="enviarDados()" v-if="showComponent"> <!--addDias();-->
                <!-- Informações do estabelecimento -->
                <div class="d-flex flex-column gap-3 flex-wrap">
                    <!-- Sobre a empresa -->
                    <fieldset class="d-flex flex-wrap flex-column gap-2 mb-2 p-2 border">
                        <div class="text-start bg-light"><strong>Sobre o estabelecimento</strong></div>
                        
                        <div class="inputsContainer w-100">
                            <div class="text-start">Logo da empresa</div>
                            <input type="file" class="form-control" id="logo" placeholder="Opcional">
                        </div>

                        <div class="inputsContainer w-100">
                            <div class="text-start">Razão social<span class="text-danger">*</span></div>
                            <input type="text" name="nome_empresa" class="form-control" id="nome_estabelecimneto" v-model="dadosForm.nome" placeholder="Nome da empresa" required>
                        </div>


                        <div>
                            <div class="text-start">Descrição<span class="text-danger">*</span></div>
                            <input type="text" name="descricao" id="descricao" class="form-control" placeholder="Descreva a sua empresa" v-model="dadosForm.descricao" required>
                        </div>


                        <div class="inputsContainer w-100">
                            <div class="text-start">CNPJ ou CPF<span class="text-danger">*</span></div>
                            <input type="number" class="form-control" id="cnpj_cpf" v-model="dadosForm.cnpj_cpf" required>
                        </div>


                        <div class="inputsContainer w-100">
                            <div class="text-start">Administrador(a)<span class="text-danger">*</span></div>
                            <input type="text" name="admins" class="form-control" id="adm" placeholder="Administrador do painel" v-model="dadosForm.admin" required>
                        </div>


                        <div class="inputsContainer w-100">
                            <div class="text-start">Opção de retirada no local?<span class="text-danger">*</span></div>
                            <select id="op_retirada" v-model="dadosForm.op_retirada" class="form-select">
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                        </div>
                    </fieldset>




                    <!-- Dias e horários -->
                    <fieldset class="d-flex flex-wrap flex-column gap-2 mb-2 p-2 border">
                        <div class="text-start bg-light"><strong>Dias e horários</strong></div>
                        <!-- Mensagens -->
                        <div id="msgs" class="p-2" v-if="showMsgHora">
                            <div>
                                <div>Horário adicionado aos dias de funcionamento</div>
                            </div>
                        </div>

                        <div style="position:relative" class="d-flex flex-column">
                            <div class="text-start">Horários (Início e término)<span class="text-danger">*</span></div>
                            <div class="text-danger" style="font-size: 12px;">Os horários serão adicionados para todos os dias da semana</div>
                            <div class="d-flex gap-1 flex"> 
                                <!-- <div class="d-flex flex-column justify-content-end" v-if="horarios_func.length > 0">
                                    <i class="fa-solid fa-caret-down fs-2" data-bs-toggle="collapse" data-bs-target="#horariosContainer"></i>
                                </div> -->
                                <input type="time" class="form-control" v-model="horaIni" id="hora_ini" required>
                                <input type="time" class="form-control" v-model="horaFim" id="hora_fim" required>      
                                <div class="btn bg-secondary text-white" title="Adicionar intervalo de tempo" v-on:click="addHora()">
                                    <i class="fa-solid fa-plus"></i>
                                </div>    
                            </div>
                            
                            <!-- <div v-if="horarios_func.length > 0" id="horariosContainer" class="bg-white shadow card collapse" style="z-index: 10; width: 200px;">
                                <div class="d-flex justify-content-between card-header align-items-center gap-3">
                                    <div class="fs-6">Horários</div>
                                    <i class="fa-solid fa-xmark" data-bs-toggle="collapse" data-bs-target="#horariosContainer"></i>                               
                                </div>           
                                
                                <template v-for="hora in horarios_func" :key="hora.id">        
                                    <div>{{ hora.horaIni }} - {{ hora.horaFim }}</div>                          
                                </template>                           
                            </div> -->
                        </div>


                        <div class="inputsContainer w-100">
                            <div class="text-start">Dias de funcionamento<span class="text-danger">*</span></div>
                            <div style="position: relative;">
                                <select id="dias" class="form-select" data-bs-toggle="collapse" data-bs-target="#diasContainer">
                                    <option style="display: none">Selecionar</option>
                                </select>
                                <input type="hidden" v-model="dias" readonly required>


                                <!-- Dias da semana -->
                                <div class="card shadow collapse" id="diasContainer">
                                    <div class="p-1">
                                        <template v-for="(dia, idia) in diasSubmit">
                                            <div class="border-bottom mb-2">
                                                <!-- Dias -->
                                                <div class="d-flex flex-start gap-1">
                                                    <input type="checkbox" class="dia_semana" :id="dia.dia" :value="dia.dia" v-on:change="marcaDia(idia)">
                                                    <label :for="dia.dia">{{dia.dia}}</label>
                                                </div>
                                                <!-- Horários -->
                                                <div class="px-3">
                                                    <template v-for="(horario, ihora) in dia.horarios">
                                                        <div class="mb-1 d-flex gap-1">
                                                            {{ `${horario.horaIni} - ${horario.horaFim}`}}
                                                            <div 
                                                            class="text-white bg-danger d-flex justify-content-center align-items-center p-1" 
                                                            style="font-size: 12px; width: 30px; border: none; background-color: brown; border-radius: 5px;"
                                                            v-on:click="removeHora(idia, ihora)"
                                                            >
                                                                <i class="fa-solid fa-trash"></i>
                                                        </div>
                                                        </div>
                                                    </template>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </div>

                            </div>
                            <input type="hidden" name="dias-funci" class="form-control" id="dias" v-model="dadosForm.dias_func">
                        </div>
                    </fieldset>




                    <!-- Endereços e contatos -->
                    <fieldset class="d-flex flex-wrap flex-column gap-2 p-2 border mb-2">
                        <div class="text-start bg-light"><strong>Endereço e contatos</strong></div>

                        <div>
                            <div class="text-start">Endereço<span class="text-danger">*</span></div>
                            <input type="text" name="endereco" class="form-control" id="endereco" placeholder="Localização da empresa" v-model="dadosForm.endereco" required>
                        </div>


                        <div>
                            <div class="text-start">Email</div>
                            <input type="email" name="email" class="form-control" id="email" placeholder="Email(Opcional)" v-model="dadosForm.email">
                        </div>


                        <div>
                            <div class="text-start">Telefone</div>
                            <input type="number" name="telefones" class="form-control" id="telefone" placeholder="Número para contato" v-model="dadosForm.telefone">
                        </div>

                        <div>
                            <div class="text-start">Redes sociais</div>
                            <input type="text" name="redes_sociais" class="form-control" id="redes" placeholder="Opcional" v-model="dadosForm.redeSocial">
                        </div>
                    </fieldset>           
                </div>



                <div class="d-flex flex-start">
                    <button class="btn bg-secondary text-white">Registrar</button>    
                </div>          
            </form>




            <!-- Formulário de edição -->
            <div v-if="!showComponent" class="border">
                <form action="">    
                    <EditEstabelecimento/>
                </form>
            </div>
        </div>
    </main>
</template>










<script type="module">
    import EditEstabelecimento from '@/components/estabelecimentos/EditEstabelecimento.vue';
    import { db, ref, push, set } from '@/firebase'; 

    export default {
        name:'CadastroView',

        components:{
            EditEstabelecimento,
        },

        data() {
            return {
                // Exibir módulos
                showComponent: true,
                //Horários
                horaIni:null,
                horaFim:null,
                horarios_func:[],
                showMsgHora:false,
                //Dias
                dias:null,
                diasSubmit:[
                    {
                        'dia':'Segunda',
                        'marcado':false,
                        'horarios':[],
                    },
                    { 
                        'dia': 'Terça', 
                        'marcado': false,
                        'horarios': [],
                    },
                    { 
                        'dia': 'Quarta', 
                        'marcado': false,
                        'horarios': [],
                    },
                    { 
                        'dia': 'Quinta', 
                        'marcado': false,
                        'horarios': [],
                    },
                    { 
                        'dia': 'Sexta', 
                        'marcado': false,
                        'horarios': [],
                    },
                    { 
                        'dia': 'Sábado', 
                        'marcado': false,
                        'horarios': [],
                    },
                    { 
                        'dia': 'Domingo', 
                        'marcado': false,
                        'horarios': [],
                    }
                ],

                dadosForm:{
                    nome:"",
                    horarios:"",
                    dias_func:"",
                    admin:"",
                    endereco:"",
                    email:"",
                    telefone:"",
                    redeSocial:"",
                    descricao:"",
                    op_retirada:"",
                }
            }
        },

        methods: {
            addHora(){
                if(this.horaIni && this.horaFim){
                    if(this.horaIni < this.horaFim){
                        var addHora = false//Indica se o valor será true, caso não houver horários repetidos

                        this.horarios_func.push({"horaIni":this.horaIni, "horaFim":this.horaFim})
                        
                        // Adicionando horário ao dia epecificado
                        this.diasSubmit.forEach((dia, i)=>{
                            if(dia.horarios.length > 0){
                                // Impedindo a adição de horários repetidos em cada dia
                                dia.horarios.forEach(horario=>{
                                    if(horario.horaIni == this.horaIni && horario.horaFim == this.horaFim){
                                        addHora = false
                                    }
                                    else{
                                        addHora = true
                                    }    
                                })
                                
                                if(addHora){
                                    dia.horarios.push({"horaIni":this.horaIni, "horaFim":this.horaFim})                                   
                                }
                            }
                            else{
                                dia.horarios.push({"horaIni":this.horaIni, "horaFim":this.horaFim})
                                addHora = true    
                            }                 
                        })

                        // Abrindo card com os dias e os seus respectivos horários
                        if(this.horarios_func.length < 2 && this.horarios_func.length > 0){
                            document.getElementById("dias").click()    
                        }

                        // Exibindo mensagem
                        if(addHora){                      
                            this.showMsgHora  = !this.showMsgHora
                            setTimeout(()=>{
                                this.showMsgHora  = !this.showMsgHora
                            }, 3000)
                        }           
                    }
                    else{
                        alert("O horário de início deve ser menor que o horário de término") 
                    }
                }
                else{
                    alert("Adicione um horário de início e de término")
                }       
            },




   
            // Remover horarios para cada dia
            removeHora(idia, ihora){
                var dias_sub = this.diasSubmit[idia].horarios.splice(ihora, 1)
            },




            // Marcar e desmarcar dias a serem enviados para o banco
            marcaDia(idia){
              this.diasSubmit[idia].marcado = !this.diasSubmit[idia].marcado
            },



            // Enviar formulário
            async enviarDados() {
                // this.addDias()

                // Validando dias selecionados
                var valida_dias = []

                this.diasSubmit.forEach(diaSubmit=>{
                    if(diaSubmit.marcado && diaSubmit.horarios.length > 0){
                        valida_dias.push({'dia':diaSubmit.dia, 'horarios':diaSubmit.horarios})
                    }
                })

                if(valida_dias.length === 0){
                    alert("Selecione pelo menos um dia de funcionamento")
                    return
                }


                // Validando horários selecionados
                if(this.horarios_func.length === 0){
                    alert("Adicione pelo menos um horário de funcionamento");
                    return;
                }


                try {
                    const empresaRef = ref(db, `estabelecimentos`);         
                    const novoUsuario = push(empresaRef);

                    await set(novoUsuario, {
                    nome_empresa: this.dadosForm.nome,
                    horarios: this.horarios_func,
                    dias_func: valida_dias,
                    admin:this.dadosForm.admin,
                    cnpj_cpf: String(this.dadosForm.cnpj_cpf),
                    endereco: this.dadosForm.endereco,
                    email: this.dadosForm.email,
                    telefone: this.dadosForm.telefone,
                    rede_social: this.dadosForm.redeSocial,
                    descricao: this.dadosForm.descricao,
                    op_retirada: this.dadosForm.op_retirada,
                    criadoEm: new Date().toISOString()
                    });

                    alert("Dados enviados com sucesso!");
                    console.log(this.dadosForm)

                    // limpa formulário
                    this.horarios_func = [];
                    this.diasSubmit = [];
                    this.dias = null;
                    this.horaIni = null;
                    this.horaFim = null;
                    this.dadosForm = {
                        nome: "",
                        admin: "",
                        cnpj_cpf: "",
                        endereco: "",
                        email: "",
                        telefone: "",
                        redeSocial: "",
                        descricao: "",
                        op_retirada:"",
                    };
                    

                    // Limpa checkboxes
                    document.querySelectorAll('.dia_semana').forEach(checkbox => {
                        checkbox.checked = false
                    })

                } catch (error) {
                    console.error("Erro ao enviar:", error)
                    alert("Erro ao enviar dados")
                }
            }
        },
    }
</script>






<style scoped>
    /* Estilo da barra de mensagens */
    #msgs{
        width: 100%;
        background-color: rgb(196, 252, 226);
    }


    /* Estilo das fontes */
    label{
      color: rgb(95, 95, 95);
    }
    div{
      color: rgb(95, 95, 95);  
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

   
    #horariosContainer{
        position: absolute;
        height:300px;
        top:70px;
        overflow-y: scroll;
    }
</style>