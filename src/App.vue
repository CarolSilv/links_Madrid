<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import './global.d.ts';

const data = ref()
const nome = ref('');
const telefone = ref('');
const instagram = ref('');
const bloco_apt = ref('');
const servico_prestado = ref('');
const descricao_servico = ref('');
const whatsapp = ref('');

onMounted(async () => {
  data.value = await getServices()
  const tel : any = $('#telefone')
  tel.mask('(00) 00000-0000')
  const whats : any = $('#whatsapp')
  whats.mask('(00) 00000-0000')
})

function returnInstragram(ig: string) {
  return ig.replace('@', '')
}

async function getServices() {
  const res = await axios({
    url: `https://links-madrid-api.vercel.app/servico/ativos`,
    method: `GET`
  }).catch((err) => {
    throw new Error(err);
  })
  return res.data.dados
}

async function inserirServicos() {
  // Validação dos campos obrigatórios
  if (!nome.value || !servico_prestado.value || !descricao_servico.value) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  // Validação do formato do telefone (opcional)
  if (telefone.value && !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(telefone.value)) {
    alert('Por favor, insira um número de telefone válido no formato (99) 99999-9999.');
    return;
  }

  // Criação do objeto de dados
  const dados = {
    nome: nome.value.trim(),
    telefone: telefone.value ? telefone.value.trim() : undefined,
    instagram: instagram.value.trim(),
    bloco_apt: bloco_apt.value.trim(),
    servico_prestado: servico_prestado.value.trim(),
    descricao_servico: descricao_servico.value.trim(),
    whatsapp: whatsapp.value.trim(),
  };



  // Envio dos dados para o backend via POST usando Axios
  try {
    await axios.post('https://links-madrid-api.vercel.app/servico', dados);
    alert('Dados inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir os dados:', error);
    alert('Erro ao inserir os dados. Por favor, tente novamente.');
  }
}


</script>

<template>
  <div class="content" style="display: flex;justify-content: center;">
    <div class="w-100 main">
      <div class="d-flex align-items-center p-3 my-3 text-white-50 bg-coral rounded shadow-sm">
        <div class="lh-100">
          <h5 class="mb-0 text-dark lh-100">Serviços prestados Condomínio Madrid</h5>
        </div>
      </div>
      <div class="my-4 mb-5 p-3 bg-white rounded shadow-sm">
        <h6 class="border-bottom border-gray pb-2 mb-0">
          É morador? Cadastre seu serviço
          <a href="#" data-toggle="modal" data-target="#cadastroModal">clicando aqui</a>.
        </h6>
        <div v-for="i in data" class="media text-muted pt-3" style="align-items: center;">

          <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          <div style="display: flex; justify-content: space-between;">
            <a :href="`https://instagram.com/${returnInstragram(i.instagram)}`" target="_blank">
              <strong class="d-block text-gray-dark">{{ i.instagram }}</strong>
            </a>
            <a v-if="i.whatsapp" :href="`https://wa.me/55${i.whatsapp}`" target="_blank">Whatsapp</a>
          </div>
          <br>
          <p><strong>Responsável: </strong>{{ i.nome }}</p>
          <p v-if="i.bloco_apt"><strong>Bloco apto: </strong>{{ i.bloco_apt }}</p>
          <p><strong>Serviço Prestado: </strong>{{ i.servico_prestado }}</p>
          <div>
            <p v-if="i.descricao"><strong>Descrição: </strong> {{ i.descricao }}</p>
          </div>
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="cadastroModal" tabindex="-1" aria-labelledby="cadastroModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Cadastro</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="nome">Nome</label>
                <input v-model="nome" type="text" class="form-control" id="nome" placeholder="Digite o nome">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="telefone">Telefone</label>
                <input v-model="telefone" v-mask="'(##) #####-####'" placeholder="(99) 99999-9999" type="text"
                  class="form-control" id="telefone">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="instagram">Instagram</label>
                <input v-model="instagram" type="text" class="form-control" id="instagram"
                  placeholder="Digite o Instagram">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="bloco_apt">Bloco/Apto</label>
                <input v-model="bloco_apt" type="text" class="form-control" id="bloco_apt"
                  placeholder="Digite o seu bloco e apartamento">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="servico_prestado">Serviço Prestado</label>
                <input v-model="servico_prestado" type="text" class="form-control" id="servico_prestado"
                  placeholder="Digite o serviço prestado">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="descricao_servico">Descrição do Serviço</label>
                <textarea v-model="descricao_servico" class="form-control" id="descricao_servico" rows="3"
                  placeholder="Digite a descrição do serviço"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="whatsapp">WhatsApp</label>
                <input v-model="whatsapp" id="whatsapp" class="form-control" v-mask="'(##) #####-####'"
                  placeholder="(99) 99999-9999">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
          <button v-on:click="inserirServicos()" type="button" class="btn btn-primary">Cadastrar</button>
        </div>
      </div>
    </div>
  </div>

  <footer class="py-3 footer fixed-bottom bg-light">
    <div class="container text-center">
      <span class="text-muted">Desenvolvido por <a :href="`https://wa.me/5575988194912`" target="blank"><strong>Dende
            Software</strong></a>.</span>
    </div>
  </footer>
</template>

<style scoped></style>
