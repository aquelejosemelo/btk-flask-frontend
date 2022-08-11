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
}

export default new BTKServicebase(release.base_url);
