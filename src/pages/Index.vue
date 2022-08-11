<template>
  <q-page class="column">
    <div class="q-pa-md">
      <div class="q-gutter-md" style="max-width: 300px">
        <div class="text-h6">Processar Job</div>
        <div class="row">
          <q-input v-model="job" outlined dense debounce="300" label="Buscar Arquivos" class="filtro q-pr-xs"/>
          <q-btn label="Buscar" color="primary" style="" @click="buscar" />
        </div>
      </div>
    </div>
    <div class="q-pa-md" v-if="arquivos && arquivos.length > 0">
      <div class="q-gutter-md" style="max-width: 300px">
        <div class="text-h6">Arquivos</div>
        <div class="row">
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
    };
  },
  methods: {
    async buscar() {
      this.arquivos = [];
      this.arquivosSelecionados = [];

      const response = await BTKServicebase.listarArquivos(this.job);

      this.arquivos = response.data;
    },
  },
};
</script>
