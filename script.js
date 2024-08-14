document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector("#novo");
    const closeButton = document.querySelector("#sair");
    const modal = document.querySelector("dialog");
    const salvarButton = document.querySelector("#salvar");
    const editarButton = document.querySelector("#editar");
    const visualizarButton = document.querySelector("#visualizar");
    const excluirButton = document.querySelector("#excluir");
    const formCliente = document.querySelector("#formCliente");
    const listaClientes = document.querySelector("#listaClientes");
    let editIndex = null;
    button.onclick = function () {
        formCliente.reset();
        salvarButton.style.display = "inline-block";
        esconderBotao('#editar');
        esconderBotao('#visualizar');
        esconderBotao('#excluir');
        desabilitarInputs(false);
        modal.showModal();
    }
    closeButton.onclick = function() {
        modal.close();
    }
    salvarButton.onclick = function() {
        const cliente = {
            nome: formCliente.nome.value,
            cpf: formCliente.cpf.value,
            rg: formCliente.rg.value,
            dataDeNascimento: formCliente.dataDeNascimento.value,
            endereco: formCliente.endereco.value,
            cep: formCliente.cep.value,
            cidade: formCliente.cidade.value,
            estado: formCliente.estado.value,
            email: formCliente.email.value,
            telefone: formCliente.telefone.value,
            celular: formCliente.celular.value
        };
        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        if (editIndex === null) {
            clientes.push(cliente);
        } else {
            clientes[editIndex] = cliente;
        }
        localStorage.setItem("clientes", JSON.stringify(clientes));
        carregarClientes();
        modal.close();
    }
    editarButton.onclick = function() {
        desabilitarInputs(false);
        salvarButton.style.display = "inline-block";
        esconderBotao('#editar');
        esconderBotao('#visualizar');
        excluirButton.style.display = "inline-block";
    }
    visualizarButton.onclick = function() {
        desabilitarInputs(true);
        esconderBotao('#salvar');
        mostrarBotao('#editar');
        esconderBotao('#visualizar');
        esconderBotao('#excluir');
    }
    excluirButton.onclick = function() {
        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        if (editIndex !== null) {
            clientes.splice(editIndex, 1);
            localStorage.setItem("clientes", JSON.stringify(clientes));
            carregarClientes();
            modal.close();
        }
    }
    function carregarClientes() {
        const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        listaClientes.innerHTML = "";
        clientes.forEach((cliente, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${cliente.nome} - ${cliente.cpf} -
                <button class="editarButton" onclick="editarCliente(${index})">Editar</button>
                <button class="visualizarButton" onclick="visualizarCliente(${index})">Visualizar</button>`;
            listaClientes.appendChild(li);
        });
    }
    window.editarCliente = function(index) {
        visualizarCliente(index); // Reutiliza a função de visualizarCliente para carregar os dados
        salvarButton.style.display = "inline-block";
        esconderBotao('#editar');
        esconderBotao('#visualizar');
        excluirButton.style.display = "inline-block";
        desabilitarInputs(false);
        modal.showModal();
        editIndex = index;
    }
    window.visualizarCliente = function(index) {
        const clientes = JSON.parse(localStorage.getItem("clientes"));
        const cliente = clientes[index];
        formCliente.nome.value = cliente.nome;
        formCliente.cpf.value = cliente.cpf;
        formCliente.rg.value = cliente.rg;
        formCliente.dataDeNascimento.value = cliente.dataDeNascimento;
        formCliente.endereco.value = cliente.endereco;
        formCliente.cep.value = cliente.cep;
        formCliente.cidade.value = cliente.cidade;
        formCliente.estado.value = cliente.estado;
        formCliente.email.value = cliente.email;
        formCliente.telefone.value = cliente.telefone;
        formCliente.celular.value = cliente.celular;
        esconderBotao('#salvar');
        esconderBotao('#editar');
        esconderBotao('#visualizar');
        esconderBotao('#excluir');
        desabilitarInputs(true);
        editIndex = index;
        modal.showModal();
    }
    function desabilitarInputs(desabilitar) {
        formCliente.querySelectorAll("input").forEach(input => {
            input.disabled = desabilitar;
        });
    }
    function esconderBotao(selector) {
        document.querySelector(selector).style.display = 'none';
    }
    function mostrarBotao(selector) {
        document.querySelector(selector).style.display = 'inline-block';
    }
    carregarClientes();
});
