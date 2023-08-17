const inputTarefa = document.querySelector(".input-tarefa");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

function criaLi() {
  const li = document.createElement("li");
  return li;
}

function criaBotoes(li) {
  const divBotoes = document.createElement("div");

  const botaoRiscar = document.createElement("button");
  botaoRiscar.innerText = "Riscar";
  botaoRiscar.classList.add("riscar");
  botaoRiscar.setAttribute("title", "Riscar essa tarefa");
  divBotoes.appendChild(botaoRiscar);

  const botaoApagar = document.createElement("button");
  botaoApagar.innerText = "Apagar";
  botaoApagar.classList.add("apagar");
  botaoApagar.setAttribute("title", "Apagar essa tarefa");
  divBotoes.appendChild(botaoApagar);

  li.appendChild(divBotoes);
}

inputTarefa.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

function limpaTarefa() {
  inputTarefa.value = "";
  inputTarefa.focus();
}

function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaTarefa();
  criaBotoes(li);   
  salvarTarefas();
}

btnTarefa.addEventListener("click", function () {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

document.addEventListener("click", function (e) {
  const el = e.target;

  if (el.classList.contains("apagar")) {
    el.parentElement.parentElement.remove(); 
    salvarTarefas();
  }

  if (el.classList.contains("riscar")) {
    el.parentElement.parentElement.classList.toggle("concluida");
    salvarTarefas();
  }
});

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll("li");
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("Apagar", "").trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  const listaDeTarefas = JSON.parse(tarefas);
  console.log(listaDeTarefas);

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}

adicionaTarefasSalvas();
