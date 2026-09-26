(function () {
  "use strict";

  function abrirModalFuncionario() {
    const modal = document.getElementById("modalFuncionario");
    const usuario = document.getElementById("usuarioFuncionario");
    const senha = document.getElementById("senhaFuncionario");
    const erro = document.getElementById("erroLoginFuncionario");

    if (!modal) {
      console.error("Modal de funcionário não encontrado.");
      return;
    }

    if (erro) erro.textContent = "";
    if (usuario) usuario.value = "";
    if (senha) senha.value = "";

    modal.style.display = "flex";

    if (usuario) {
      setTimeout(() => usuario.focus(), 100);
    }
  }

  function fecharModalFuncionario() {
    const modal = document.getElementById("modalFuncionario");

    if (modal) {
      modal.style.display = "none";
    }
  }

  async function fazerLoginFuncionario() {
    const usuarioInput = document.getElementById("usuarioFuncionario");

    const senhaInput = document.getElementById("senhaFuncionario");

    const erro = document.getElementById("erroLoginFuncionario");

    const botao = document.getElementById("btnLoginFuncionario");

    const usuario = usuarioInput ? usuarioInput.value.trim() : "";

    const senha = senhaInput ? senhaInput.value : "";

    if (!usuario || !senha) {
      if (erro) {
        erro.textContent = "Digite usuário e senha.";
      }
      return;
    }

    if (botao) {
      botao.disabled = true;
      botao.textContent = "Entrando...";
    }

    try {
      console.log("Enviando login:", usuario);

      const resposta = await fetch("/employees/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: usuario,
          senha: senha,
        }),
      });

      const dados = await resposta.json();

      console.log("Resposta do servidor:", dados);

      if (!resposta.ok) {
        throw new Error(dados.erro || "Usuário ou senha inválidos.");
      }

      if (!dados.sucesso || !dados.funcionario) {
        throw new Error("Resposta inválida do servidor.");
      }

      window.funcionarioAtual = dados.funcionario.id;
      window.funcionarioLogadoDados = dados.funcionario;

      const botaoFuncionario = document.getElementById("funcionarioLogado");

      if (botaoFuncionario) {
        botaoFuncionario.textContent = "Funcionário: " + dados.funcionario.nome;
      }

      console.log("FUNCIONÁRIO LOGADO:", dados.funcionario);

      fecharModalFuncionario();
    } catch (erroLogin) {
      console.error("Erro no login:", erroLogin);

      if (erro) {
        erro.textContent = erroLogin.message;
      }
    } finally {
      if (botao) {
        botao.disabled = false;
        botao.textContent = "Entrar";
      }
    }
  }

  function inicializarLogin() {
    const botaoFuncionario = document.getElementById("funcionarioLogado");

    const botaoLogin = document.getElementById("btnLoginFuncionario");

    const campoSenha = document.getElementById("senhaFuncionario");

    if (!botaoFuncionario) {
      console.error("Botão funcionarioLogado não encontrado.");
      return;
    }

    botaoFuncionario.addEventListener("click", abrirModalFuncionario);

    if (botaoLogin) {
      botaoLogin.addEventListener("click", fazerLoginFuncionario);
    }

    if (campoSenha) {
      campoSenha.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          fazerLoginFuncionario();
        }
      });
    }

    window.abrirModalFuncionario = abrirModalFuncionario;

    window.fecharModalFuncionario = fecharModalFuncionario;

    window.fazerLoginFuncionario = fazerLoginFuncionario;

    console.log("LOGIN FUNCIONÁRIO: SISTEMA CARREGADO");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarLogin);
  } else {
    inicializarLogin();
  }
})();
