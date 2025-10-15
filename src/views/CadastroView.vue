<template>
    <main class="container-lg">
        <header class="d-flex justify-content-center align-items-center gap-1 mb-2">
            <img src="img/estabelecimento.png" alt="ícone loja" width="30px">
            <h4 class="mt-3">CADASTRO</h4>
        </header>

        <form class="cadastro" @submit.prevent="enviarDados()"> <!--addDias();-->
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
                        <input type="text" name="nome_empresa" class="form-control" id="nome_estabelecimneto" v-model="dadosForm.nome" required>
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
                </fieldset>




                <!-- Dias e horários -->
                <fieldset class="d-flex flex-wrap flex-column gap-2 mb-2 p-2 border">
                    <div class="text-start bg-light"><strong>Dias e horários</strong></div>

                    <div style="position:relative" class="d-flex flex-column">
                        <div class="text-start">Horários (Início e término)<span class="text-danger">*</span></div>
                        <div class="d-flex gap-1 flex"> 
                            <div class="d-flex flex-column justify-content-end" v-if="horarios_func.length > 0">
                                <i class="fa-solid fa-caret-down fs-2" data-bs-toggle="collapse" data-bs-target="#horariosContainer"></i>
                            </div>
                            <input type="time" class="form-control" v-model="horaIni" id="hora_ini" required>
                            <input type="time" class="form-control" v-model="horaFim" id="hora_fim" required>      
                            <div class="btn bg-primary text-white" title="Adicionar intervalo de tempo" v-on:click="addHora()">
                                <i class="fa-solid fa-plus"></i>
                            </div>    
                        </div>
                        
                        <div v-if="horarios_func.length > 0" id="horariosContainer" class="bg-white shadow card collapse" style="z-index: 10; width: 200px;">
                            <div class="d-flex justify-content-between card-header align-items-center gap-3">
                                <div class="fs-6">Horários</div>
                                <i class="fa-solid fa-xmark" data-bs-toggle="collapse" data-bs-target="#horariosContainer"></i>                               
                            </div>           
                            
                            <template v-for="hora in horarios_func" :key="hora.id">        
                                <div>{{ hora.horaIni }} - {{ hora.horaFim }}</div>                          
                            </template>                           
                        </div>
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
                                    <div class="d-flex flex-start gap-1">
                                        <input type="checkbox" class="dia_semana" id="segunda" value="segunda">
                                        <label for="segunda">Segunda</label>
                                    </div>
                                    <div class="d-flex flex-start gap-1">
                                        <input type="checkbox" class="dia_semana" id="terca" value="terca">
                                        <label for="terca">Terça</label>
                                    </div>
                                    <div class="d-flex flex-start gap-1">
                                        <input type="checkbox" class="dia_semana" id="quarta" value="quarta">
                                        <label for="quarta">Quarta</label>
                                    </div>
                                    <div class="d-flex flex-start gap-1">
                                        <input type="checkbox" class="dia_semana" id="quinta" value="quinta">
                                        <label for="quinta">Quinta</label>
                                    </div>
                                    <div class="d-flex flex-start gap-1">
                                        <input type="checkbox" class="dia_semana" id="sexta" value="sexta">
                                        <label for="sexta">Sexta</label>
                                    </div>
                                    <div class="d-flex flex-start gap-1">
                                        <input type="checkbox" class="dia_semana" id="sabado" value="sabado">
                                        <label for="sabado">Sábado</label>
                                    </div>
                                    <div class="d-flex flex-start gap-1">
                                        <input type="checkbox" class="dia_semana" id="domingo" value="domingo">
                                        <label for="domingo">Domingo</label>
                                    </div>
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
                <button class="btn bg-primary text-white">Registrar</button>    
            </div>          
        </form>
    </main>

    <!-- <button @click="testarFirebase()" class="btn btn-secondary mt-2">Testar Firebase</button> -->
</template>










<script type="module">
    import { db, ref, push, set } from '@/firebase'; 

    export default {
        name:'CadastroView',
        data() {
            return {
                //Horários
                horaIni:null,
                horaFim:null,
                horarios_func:[],
                //Dias
                dias:null,
                diasSubmit:[],

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
                }
            }
        },

        methods: {
            // async testarFirebase() {
            //     try {
            //         const testRef = ref(db, 'teste');
            //         await set(testRef, { 
            //             mensagem: 'Teste de conexão',
            //             timestamp: new Date().toISOString()
            //         });
            //         alert('Firebase conectado com sucesso!');
            //     } catch (error) {
            //         console.error('Erro no teste:', error);
            //         alert(`Erro: ${error.message}`);
            //     }
            // },


            // Adicionar horas no array de horas
            addHora(){
                if(this.horaIni && this.horaFim){
                    if(this.horaIni < this.horaFim){
                        this.horarios_func.push({"horaIni":this.horaIni, "horaFim":this.horaFim})
                        this.horaIni = null
                        this.horaFim = null    
                    }
                    else{
                        alert("O horário de início deve ser menor que o horário de término") 
                    }               
                }
                else{
                    alert("Adicione um horário de início e de término")
                }       
            },


            // Adicionar dias no array de dias
            addDias(){
                this.diasSubmit = []

                var diasSelecionados = document.querySelectorAll(".dia_semana")
                diasSelecionados.forEach(dia_selecionado=>{
                    if(dia_selecionado.checked){
                        this.diasSubmit.push(dia_selecionado.value)
                        
                    }
                })

                this.dias = JSON.stringify(this.diasSubmit)
                
            },



            // Enviar formulário
            async enviarDados() {
                this.addDias()

                // Validando dias selecionados
                if(this.diasSubmit.length === 0){
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
                    dias_func: this.diasSubmit,
                    admin:this.dadosForm.admin,
                    cnpj_cpf: String(this.dadosForm.cnpj_cpf),
                    endereco: this.dadosForm.endereco,
                    email: this.dadosForm.email,
                    telefone: this.dadosForm.telefone,
                    rede_social: this.dadosForm.redeSocial,
                    descricao: this.dadosForm.descricao,
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

   
    #horariosContainer{
        position: absolute;
        height:300px;
        top:70px;
        overflow-y: scroll;
    }
</style>