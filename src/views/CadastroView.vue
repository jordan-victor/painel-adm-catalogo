<template>
    <main class="container-lg">
        <header class="d-flex justify-content-center align-items-center gap-1 mb-4">
            <img src="img/estabelecimento.png" alt="ícone loja" width="30px">
            <h4>CADASTRO</h4>
        </header>

        <form class="cadastro" @submit.prevent="addDias(); enviarDados()">
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
                        <div class="text-start">Razão social</div>
                        <input type="text" name="nome_empresa" class="form-control" id="nome_estabelecimneto" v-model="dadosForm.nome">
                    </div>


                     <div>
                        <div class="text-start">Descrição</div>
                        <input type="text" name="descricao" id="descricao" class="form-control" placeholder="Descreva a sua empresa" v-model="dadosForm.descricao">
                    </div>


                    <div class="inputsContainer w-100">
                        <div class="text-start">CNPJ ou CPF</div>
                        <select id="cnpj_cpf" class="form-select">
                            <option value="">Selecionar</option>
                            <option value="1">CPF</option>
                            <option value="2">CNPJ</option>
                        </select>
                        <input type="hidden" class="form-control" id="cnpj_cpf" v-model="dadosForm.cnpj_cpf">
                    </div>


                    <div class="inputsContainer w-100">
                        <div class="text-start">Administrador(a)</div>
                        <input type="text" name="admins" class="form-control" id="adm" placeholder="Administrador do painel" v-model="dadosForm.admin">
                    </div>
                </fieldset>




                <!-- Dias e horários -->
                <fieldset class="d-flex flex-wrap flex-column gap-2 mb-2 p-2 border">
                    <div class="text-start bg-light"><strong>Dias e horários</strong></div>

                    <div style="position:relative" class="d-flex flex-column">
                        <div class="text-start">Horários (Início e término)</div>
                        <div class="d-flex gap-1 flex"> 
                            <input type="time" class="form-control" v-model="horaIni" id="hora_ini">
                            <input type="time" class="form-control" v-model="horaFim" id="hora_fim">
                            <div class="btn bg-primary text-white" title="Adicionar intervalo de tempo" v-on:click="addHora()">
                                <i class="fa-solid fa-plus"></i>
                            </div>    
                        </div>
                        
                        <div v-if="horarios_func.length > 0" id="horariosContainer" class="bg-white shadow card">           
                            <div  class="card-header fs-6">Horários de funcionamento</div>
                            <template v-for="hora in horarios_func" :key="hora.id">        
                                <div>{{ hora.horaIni }} - {{ hora.horaIni }}</div>                          
                            </template>                           
                        </div>
                    </div>


                    <div class="inputsContainer w-100">
                        <div class="text-start">Dias de funcionamento</div>
                        <div style="position: relative;">
                            <select id="dias" class="form-select">
                                <option value="" style="display: none">Selecionar</option>
                            </select>
                            <input type="text" v-model="dias">

                            <!-- Dias da semana -->
                            <div class="shadow">
                                <div class="bg-light"><strong>Dias da semana</strong></div>

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
                        <div class="text-start">Endereço</div>
                        <input type="text" name="endereco" class="form-control" id="endereco" placeholder="Localização da empresa" v-model="dadosForm.endereco">
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
                var diasSelecionados = document.querySelectorAll(".dia_semana")
                diasSelecionados.forEach(dia_selecionado=>{
                    if(dia_selecionado.checked){
                        this.diasSubmit.push(dia_selecionado.value)
                        this.dias = JSON.stringify(this.diasSubmit)
                    }
                })

                this.diasSubmit = []
            },



            // Enviar formulário
            async enviarDados() {
                alert("Enviando")

                try {
                    const empresaRef = ref(db, "empresas");         
                    const novoUsuario = push(empresaRef);

                    await set(novoUsuario, {
                    nome_empresa: this.dadosForm.nome,
                    horarios: this.dadosForm.horarios,
                    dias_func: this.dadosForm.dias_func,
                    adm: this.dadosForm.admin,
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
                    this.dadosForm = {
                        nome:"",
                        horarios:"",
                        dias_func:"",
                        admin:"",
                        senha:"",
                        endereco:"",
                        email:"",
                        telefone:"",
                        redeSocial:"",
                        descricao:"",
                    };
                } catch (error) {
                    console.error("Erro ao enviar:", error);
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