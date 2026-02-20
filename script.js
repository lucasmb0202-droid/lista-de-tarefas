const input = document.getElementById("input-tarefa");
const botao = document.getElementById("botao-adicionar");
const lista = document.getElementById("lista-tarefas");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefas() {

  localStorage.setItem("tarefas", JSON.stringify(tarefas));

}

function mostrarTarefas() {

  lista.innerHTML = "";

  tarefas.forEach((tarefa, index) => {

    const li = document.createElement("li");

    li.textContent = tarefa.texto;

    if (tarefa.concluida) {

      li.classList.add("concluida");

    }

    li.addEventListener("click", () => {

      tarefas[index].concluida = !tarefas[index].concluida;

      salvarTarefas();
      mostrarTarefas();

    });

    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "X";

    botaoExcluir.addEventListener("click", (evento) => {

      evento.stopPropagation();

      tarefas.splice(index, 1);

      salvarTarefas();
      mostrarTarefas();

    });

    li.appendChild(botaoExcluir);

    lista.appendChild(li);

  });

}

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

mostrarTarefas();