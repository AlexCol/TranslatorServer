import * as fs from "fs";
import * as path from "path";

function gerarArquivosLorem(qtdLinhas: number, min = 5, max = 20): void {
  const loremBase = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";

  const palavras = loremBase.split(" ");
  const chavesGeradas = new Set<string>();
  const chaves: string[] = [];
  const chaveValor: string[] = [];

  function gerarLinha(tamanho: number): string {
    let linha = "";

    while (true) {
      const palavra = palavras[Math.floor(Math.random() * palavras.length)];

      if (palavra.includes(";")) continue;

      const tentativa = (linha + " " + palavra).trim();

      if (tentativa.length > tamanho) break;

      linha = tentativa;
    }

    if (linha.length < min) {
      linha = linha.padEnd(min, ".");
    }

    return linha.replace(/;/g, "");
  }

  while (chaves.length < qtdLinhas) {
    const tamanhoChave = Math.floor(Math.random() * (max - min + 1)) + min;

    const chave = gerarLinha(tamanhoChave);

    if (chavesGeradas.has(chave)) continue;

    chavesGeradas.add(chave);
    chaves.push(chave);

    // gera valor independente
    let valor: string;
    do {
      const tamanhoValor = Math.floor(Math.random() * (max - min + 1)) + min;
      valor = gerarLinha(tamanhoValor);
    } while (valor.includes(";"));

    chaveValor.push(`${chave};${valor}`);
  }

  salvarArquivo("lorem_chaves.txt", chaves.join("\n"));
  salvarArquivo("lorem_chave_valor.txt", chaveValor.join("\n"));
}

function salvarArquivo(nome: string, conteudo: string): void {
  const caminho = path.join(__dirname, nome);

  fs.writeFileSync(caminho, conteudo, {
    encoding: "utf-8",
  });

  console.log(`Arquivo salvo: ${caminho}`);
}

//
// ✅ Uso
//
gerarArquivosLorem(10000);
