import axios from 'axios';
import release from 'public/release.json';

export class BTKServicebase {
  constructor(url) {
    this.url = url;
    this.http = axios.create({
      baseURL: this.url,
      timeout: 1000,
    });
  }

  async listarArquivos(job) {
    return this.http.get(`${this.url}/arquivos?job=${job}`);
  }

  // eslint-disable-next-line class-methods-use-this
  async processarArquivos(arquivos) {
    // return this.http.post(`${this.url}/processar-arquivos`, arquivos);
    return new Promise((resolve) => {
      const resultados = arquivos.map((a) => ({
        arquivo: a.nome,
        indice1: 1,
        indice2: 2,
      }));
      resolve({ data: resultados });
    });
  }
}

export default new BTKServicebase(release.base_url);
