/* Contagem de Medalhas
Crie um programa que receba o número de medalhas de ouro, prata e bronze de um país nas Olimpíadas e calcule o total de medalhas. Quando escrever 'sair', o programa deverá encerrar e mostrar na tela o ranking de medalhas no formato:


#Ranking de medalhas:
#Brasil: 7 medalhas
#França: 6 medalhas
#Argentina: 3 medalhas

*/
// Contagem de Medalhas
// Contagem de Medalhas com tratamento de empate e acúmulo de países repetidos
let ranking = {};

while (true) {
  let pais = prompt("Digite o nome do país (ou 'sair' para encerrar):");
  
  if (!pais) continue;

  pais = pais.trim();

  if (pais.toLowerCase() === "sair") {
    break;
  }

  let ouro = parseInt(prompt(`Quantas medalhas de ouro o país ${pais} ganhou?`), 10);
  let prata = parseInt(prompt(`Quantas medalhas de prata o país ${pais} ganhou?`), 10);
  let bronze = parseInt(prompt(`Quantas medalhas de bronze o país ${pais} ganhou?`), 10);

  if (isNaN(ouro) || isNaN(prata) || isNaN(bronze)) {
    alert("Por favor, insira apenas números válidos para as medalhas.");
    continue;
  }

  // Se o país já existir, soma as medalhas ao total anterior
  if (ranking[pais]) {
    ranking[pais].ouro += ouro;
    ranking[pais].prata += prata;
    ranking[pais].bronze += bronze;
  } else {
    ranking[pais] = { ouro, prata, bronze };
  }
}

// Converte o objeto em array e ordena
let rankingOrdenado = Object.entries(ranking).sort((a, b) => {
  // Critérios de desempate: ouro > prata > bronze
  if ((b[1].ouro + b[1].prata + b[1].bronze) !== (a[1].ouro + a[1].prata + a[1].bronze)) {
    return (b[1].ouro + b[1].prata + b[1].bronze) - (a[1].ouro + a[1].prata + a[1].bronze);
  }
  if (b[1].ouro !== a[1].ouro) {
    return b[1].ouro - a[1].ouro;
  }
  if (b[1].prata !== a[1].prata) {
    return b[1].prata - a[1].prata;
  }
  return b[1].bronze - a[1].bronze;
});

// Exibe o resultado final
let resultado = "#Ranking de medalhas:\n";
rankingOrdenado.forEach(([pais, medalhas]) => {
  let total = medalhas.ouro + medalhas.prata + medalhas.bronze;
  resultado += `#${pais}: ${total} medalhas (🥇${medalhas.ouro} 🥈${medalhas.prata} 🥉${medalhas.bronze})\n`;
});

alert(resultado);
