// Elementos do DOM
const input = document.getElementById("input-tarefa");
const botao = document.getElementById("botao-adicionar");
const lista = document.getElementById("lista-tarefas");

// Carrega tarefas do localStorage ou inicia array vazio
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Salva tarefas no localStorage
function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Renderiza todas as tarefas na lista
function mostrarTarefas() {
  lista.innerHTML = "";
  
  tarefas.forEach((tarefa, index) => {
    // Cria elemento da tarefa
    const li = document.createElement("li");
    li.textContent = tarefa.texto;
    
    // Aplica se concluída
    if (tarefa.concluida) {
      li.classList.add("concluida");
    }
    
    // Concluída ao clicar na tarefa
    li.addEventListener("click", () => {
      tarefas[index].concluida = !tarefas[index].concluida;
      salvarTarefas();
      mostrarTarefas();
    });
    
    // Botão excluir
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "X";
    botaoExcluir.addEventListener("click", (evento) => {
      evento.stopPropagation(); // Impede toggle ao clicar no X
      tarefas.splice(index, 1);
      salvarTarefas();
      mostrarTarefas();
    });
    
    li.appendChild(botaoExcluir);
    lista.appendChild(li);
  });
}

// Adiciona nova tarefa
botao.addEventListener("click", () => {
  const texto = input.value.trim();
  if (texto !== "") {
    tarefas.push({
      texto: texto,
      concluida: false
    });
    salvarTarefas();
    mostrarTarefas();
    input.value = "";
  }
});

// Carrega tarefas
mostrarTarefas();