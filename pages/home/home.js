firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // Usuário está logado
        var topbar = document.getElementsByClassName('topbar')[0];
        var loginCadastro = document.getElementsByClassName('login-cadastro')[0];
        var logoutButton = document.createElement('button');
        logoutButton.textContent = 'Sair';
        logoutButton.setAttribute('type', 'button');
        logoutButton.setAttribute('class', 'clear');
        logoutButton.setAttribute('onclick', 'logout()');
        topbar.removeChild(loginCadastro);
        topbar.appendChild(logoutButton);
    } else {
        // Usuário não está logado
        var topbar = document.getElementsByClassName('topbar')[0];
        var logoutButton = document.getElementsByClassName('clear')[0];
        var loginCadastro = document.createElement('div');
        loginCadastro.setAttribute('class', 'login-cadastro');
        var loginCadastroInput = document.createElement('input');
        loginCadastroInput.setAttribute('type', 'text');
        loginCadastroInput.setAttribute('placeholder', 'Login/Cadastro');
        var entrarButton = document.createElement('button');
        entrarButton.textContent = 'Entrar';
        entrarButton.setAttribute('type', 'button');
        entrarButton.setAttribute('class', 'entrar-button');
        loginCadastro.appendChild(loginCadastroInput);
        loginCadastro.appendChild(entrarButton);
        topbar.removeChild(logoutButton);
        topbar.appendChild(loginCadastro);
    }
});

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    });
}