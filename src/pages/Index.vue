<template>
  <q-page>
    <div class="column q-pa-md">
      <div class="job-form">
        <div class="column q-gutter-md" style="max-width: 600px">
          <div class="text-h6">Processar Job</div>
          <div class="row">
            <q-input v-model="job" outlined dense debounce="300" label="Job" class="q-pr-xs" style="width: 300px"/>
            <q-btn label="Buscar arquivos" color="primary" style="" @click="buscarArquivos" :disable="!job"/>
          </div>
        </div>
      </div>
      <div class="arquivos-form q-pt-md" >
        <div class="column" v-if="arquivos && arquivos.length > 0">
          <div class="row q-gutter-md">
            <q-table
              class="tabela-arquivos col"
              title="Arquivos"
              :data="arquivos"
              :columns="colunas"
              row-key="nome"
              selection="multiple"
              :selected.sync="arquivosSelecionados"
              :pagination.sync="paginacao"
              hide-pagination
              :selected-rows-label="getSelectedString"
              dense
            >
              <template v-slot:top-right>
                <div class="q-pt-sm">
                  <q-btn
                    class=""
                    label="Processar arquivos"
                    color="primary"
                    :disable="!arquivosSelecionados || arquivosSelecionados.length === 0"
                    @click="processarArquivos">
                  </q-btn>
                </div>
              </template>
            </q-table>
            <q-table
              v-if="resultados && resultados.length > 0"
              class="tabela-arquivos col"
              title="Índices"
              :data="resultados"
              :columns="colunasResultados"
              row-key="nome"
              :pagination.sync="paginacao"
              hide-pagination
              dense
            >
              <template v-slot:top-right>
                <div class="q-pt-sm">
                  <q-btn
                    class=""
                    label="Limpar"
                    color="primary"
                    @click="limparProcessamento">
                  </q-btn>
                </div>
              </template>
            </q-table>
          </div>
          <div class="column" v-if="false">
            <div class="text-h6">Arquivos</div>
            <q-select
              ref="filtroarquivos"
              v-model="arquivosSelecionados"
              style="width: 300px;"
              dense
              outlined
              label="Arquivos"
              :options="arquivos"
              map-options
              option-value="nome"
              option-label="nome"
              use-chips
              multiple
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey"> Sem registros </q-item-section>
                </q-item>
              </template>
              <template #option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                <q-item v-bind="itemProps" v-on="itemEvents">
                  <q-item-section>
                    <!-- eslint-disable-next-line -->
                    <q-item-label v-html="opt.nome" />
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle :value="selected" @input="toggleOption(opt)" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
        <div v-else class="text-h6 bg-lightgray">
          Não foram encontrados arquivos para o JOB informado
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import BTKServicebase from '@/services/BTKServiceBase.js';

export default {
  name: 'PageIndex',
  data() {
    return {
      job: '',
      arquivos: [],
      arquivosSelecionados: [],
      resultados: [],
      colunas: [
        {
          name: 'nome',
          required: true,
          label: 'Nome do arquivo',
          align: 'left',
          field: (row) => row.nome,
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      colunasResultados: [
        {
          name: 'arquivo',
          required: true,
          label: 'Nome do arquivo',
          align: 'left',
          field: (row) => row.arquivo,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'indice1',
          required: true,
          label: 'Índice 1',
          align: 'left',
          field: (row) => row.indice1,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'indice2',
          required: true,
          label: 'Índice 2',
          align: 'left',
          field: (row) => row.indice2,
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      paginacao: {
        sortBy: 'nome',
        descending: false,
        rowsPerPage: 0,
      },
    };
  },
  computed: {

  },
  methods: {
    async buscarArquivos() {
      const response = await BTKServicebase.listarArquivos(this.job);

      this.arquivos = response.data;
      this.arquivosSelecionados = [];
      this.resultados = [];
    },
    async processarArquivos() {
      const response = await BTKServicebase.processarArquivos(this.arquivosSelecionados);

      this.resultados = response.data;
    },
    limparProcessamento() {
      this.resultados = [];
    },
    getSelectedString() {
      const registroStr = `registro${this.arquivosSelecionados.length > 1
        ? 's'
        : ''}`;
      const selecionadoStr = `selecionado${this.arquivosSelecionados.length > 1
        ? 's'
        : ''}`;

      return this.arquivosSelecionados.length === 0
        ? ''
        : `${this.arquivosSelecionados.length} ${registroStr} ${selecionadoStr} de ${this.arquivos.length}`;
    },
  },
};
</script>

<style scoped lang="sass">
.tabela-arquivos
  height: 500px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1

  thead tr:last-child th
    top: 48px
  thead tr:first-child th
    top: 0
</style>
