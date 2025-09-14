<template>
    <main class="container-lg">
        <header class="d-flex justify-content-center align-items-center gap-1 mb-4">
            <img src="img/estabelecimento.png" alt="ícone loja" width="30px">
            <h4>CADASTRO</h4>
        </header>

        <form class="cadastro card p-3" @submit.prevent="enviarDados()">
            <!-- Informações do estabelecimento -->
            <fieldset class="d-flex gap-3 flex-wrap align-items-center mb-3 P-2">
                <legend class="text-start bg-light">INFORMAÇÕES DA EMPRESA</legend>               
                <div>
                    <div class="text-start">Logo da empresa</div>
                    <input type="file" class="form-control" id="logo" placeholder="Opcional">
                </div>

                <div>
                    <div class="text-start">Nome da empresa</div>
                    <input type="text" name="nome_empresa" class="form-control" id="nome_estabelecimneto" v-model="dadosForm.nome">
                </div>


                <div>
                    <div class="text-start">Horários</div>
                    <div class="d-flex gap-1"> 
                        <input type="time" class="form-control" v-model="horaIni" id="hora_ini">
                        <input type="time" class="form-control" v-model="horaFim" id="hora_fim">
                        <div class="btn bg-primary text-white" title="Adicionar intervalo de tempo" v-on:click="addHora()">
                            <i class="fa-solid fa-plus"></i>
                        </div>    
                    </div>
                    
                    <div v-if="horarios_func.length > 0">
                        <h5>Horários de funcionamento</h5>
                        <template v-for="hora in horarios_func" :key="hora.id">        
                            <div>{{ hora.horaIni }} - {{ hora.horaIni }}</div>                          
                        </template>
                    </div>
                </div>


                <div>
                    <div class="text-start">Dias de funcionamento</div>
                    <input type="text" name="dias-funci" class="form-control" id="dias" v-model="dadosForm.dias_func">
                </div>


                <div>
                    <div class="text-start">Administrador(a)</div>
                    <input type="text" name="admins" class="form-control" id="adm" placeholder="Administrador do painel" v-model="dadosForm.admin">
                </div>

                <div>
                    <div class="text-start">Senha</div>
                    <input type="password" name="senha" class="form-control" id="password" placeholder="Senha para acessar o painel" v-model="dadosForm.senha">
                </div>


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


                <div>
                    <div class="text-start">Descrição</div>
                    <input type="text" name="descricao" id="descricao" class="form-control" placeholder="Descreva a sua empresa" v-model="dadosForm.descricao">
                </div>
            </fieldset>




            <button class="btn bg-secondary text-white">Registrar</button>
        </form>
    </main>
</template>










<script type="module">
    import { db, ref, push, set } from '@/firebase'; 

    export default {
        name:'CadastroView',
        data() {
            return {
                horaIni:null,
                horaFim:null,
                horarios_func:[],

                dadosForm:{
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
                }
            }
        },

        methods: {
            addHora(){

                if(this.horaIni && this.horaFim){
                    this.horarios_func.push({"horaIni":this.horaIni, "horaFim":this.horaFim})
                    console.log(this.horarios_func)    
                }
                else{
                    alert("Adicione um horário de início e outro de término")
                }       
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
                    senha: this.dadosForm.senha,
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
    label{
        margin-left: 0px;
    }
    button{
        width: 100px;
    }

    /* Estilo dos inputs */
    input{
        min-width: 300px;
        width: 100%;
        flex: 1;
    }

    fieldset > div{
        flex: 1;
    }
</style>