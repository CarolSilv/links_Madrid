<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const data = ref()
// const profilePicture = ref()


onMounted(async () => {
  data.value = await getServices()
  $('#telefone').mask('(00) 00000-0000')
  $('#whatsapp').mask('(00) 00000-0000')

})

function returnInstragram(ig: string) {
  return ig.replace('@', '')
}

async function getServices() {
  const res = await axios({
    url: `https://links-madrid-api.vercel.app/ativos`,
    method: `GET`
  }).catch((err) => {
    throw new Error(err);
  })
  return res.data.dados
}

async function inserirServicos() {
  // Captura dos dados do formulário
  const nome: string = (document.getElementById('nome') as HTMLInputElement).value.trim();
  const telefone: string | undefined = (document.getElementById('telefone') as HTMLInputElement)?.value?.trim();
  const instagram: string = (document.getElementById('instagram') as HTMLInputElement).value.trim();
  const blocoApt: string = (document.getElementById('bloco_apt') as HTMLInputElement).value.trim();
  const servicoPrestado: string = (document.getElementById('servico_prestado') as HTMLInputElement).value.trim();
  const descricaoServico: string = (document.getElementById('descricao_servico') as HTMLInputElement).value.trim();
  const whatsapp: string = (document.getElementById('whatsapp') as HTMLInputElement).value.trim();

  // Validação dos campos obrigatórios
  if (!nome || !instagram || !servicoPrestado || !descricaoServico || !whatsapp) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  // Validação do formato do telefone (opcional)
  if (telefone && !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(telefone)) {
    alert('Por favor, insira um número de telefone válido no formato (99) 9999-9999.');
    return;
  }

  // Validação do formato do WhatsApp (opcional)
  if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(whatsapp)) {
    alert('Por favor, insira um número de WhatsApp válido no formato (99) 99999-9999.');
    return;
  }

  // Criação do objeto de dados
  const dados = {
    nome,
    telefone,
    instagram,
    bloco_apt: blocoApt,
    servico_prestado: servicoPrestado,
    descricao_servico: descricaoServico,
    whatsapp,
  };

  // Envio dos dados para o backend via POST usando Axios
  try {
    const response = await axios.post('URL_DO_BACKEND', dados);
    console.log('Dados inseridos com sucesso:', response.data);
    alert('Dados inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir os dados:', error);
    alert('Erro ao inserir os dados. Por favor, tente novamente.');
  }
}


</script>

<template>
  <div class="content">
    <div class="w-75 main">
      <div class="d-flex align-items-center p-3 my-3 text-white-50 bg-coral rounded shadow-sm">
        <div class="lh-100">
          <h5 class="mb-0 text-dark lh-100">Serviços prestados Condomínio Madrid</h5>
        </div>
      </div>
      <div class="my-3 p-3 bg-white rounded shadow-sm">
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
            <p><strong>Descrição: </strong></p>
            <p v-if="i.descricao_servico">
              {{ i.descricao_servico }}
            </p>
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
                <input type="text" class="form-control" id="nome" placeholder="Digite o nome">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="telefone">Telefone</label>
                <input v-mask="'(##) #####-####'" placeholder="(99) 99999-9999" type="text" class="form-control"
                  id="telefone">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="instagram">Instagram</label>
                <input type="text" class="form-control" id="instagram" placeholder="Digite o Instagram">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="bloco_apt">Bloco/Apto</label>
                <input type="text" class="form-control" id="bloco_apt" placeholder="Digite o seu bloco e apartamento">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="servico">Serviço Prestado</label>
                <input type="text" class="form-control" id="servico" placeholder="Digite o serviço prestado">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="descricao">Descrição do Serviço</label>
                <textarea class="form-control" id="descricao" rows="3"
                  placeholder="Digite a descrição do serviço"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="whatsapp">WhatsApp</label>
                <input id="whatsapp" class="form-control" v-mask="'(##) #####-####'" placeholder="(99) 99999-9999">
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
</template>

<style scoped></style>
