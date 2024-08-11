firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

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
function carrinho() {
    window.location.href = "../../pages/carrinho/carrinho.html";
  }
function manipulaproduto(){
    window.location.href = "../../pages/novoproduto/novoproduto.html";
}
function getProducts(categoria) {
    return firebase.firestore().collection(categoria).get();
  }
  
  function exibirProdutos(categoria, containerId) {
      getProducts(categoria).then(snapshot => {
          const container = document.getElementById(containerId);
          snapshot.docs.forEach(doc => {
              const produto = doc.data();
              const produtoElement = document.createElement('div');
              produtoElement.style.display = 'flex';
              produtoElement.style.flexDirection = 'column';
              produtoElement.style.alignItems = 'center';
              produtoElement.style.border = '1px solid #ccc';
              produtoElement.style.padding = '10px';
              produtoElement.style.margin = '10px';
              produtoElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  
              const fotoPath = `${categoria}/${produto.foto}`;
              const storageRef = firebase.storage().ref();
              const fotoRef = storageRef.child(fotoPath);
  
              fotoRef.getDownloadURL().then(url => {
                  const img = document.createElement('img');
                  img.src = url;
                  img.alt = 'foto';
                  img.style.width = '200px';
                  img.style.marginBottom = '10px'; 
  
                  produtoElement.appendChild(img);
  
                  const detalhesProduto = document.createElement('div');
                  detalhesProduto.innerHTML = `
                      <h3>${doc.id}</h3>
                      <p><b>Preço:</b> ${produto.valor}</p>
                      <p><b>Descrição:</b> ${produto.descricao}</p>
                      <p><b>Estoque:</b> ${produto.estoque}</p>
                  `;
                  const user = firebase.auth().currentUser;
                  const button = document.createElement('button');
  
                  if (user) {
                      button.textContent = 'Adicionar no Carrinho';
                      button.className = 'carrinho-btn';
                      button.onclick = () => adicionarnocarrinho(categoria, doc.id, produto.valor, produto.estoque);
                  } else {
                      button.textContent = 'Faça login para comprar';
                      button.disabled = true;
                      button.style.cursor = 'not-allowed';
                  }
  
                  detalhesProduto.appendChild(button);
                
                  produtoElement.appendChild(detalhesProduto);
                  container.appendChild(produtoElement);
              }).catch(error => {
                  console.error('Erro ao obter a URL da foto:', error);
              });
          });
      }).catch(error => {
          console.error('Erro ao buscar produtos:', error);
      });
  }
  
exibirProdutos('Anel', 'aneis-list');
exibirProdutos('Brinco', 'brincos-list');
exibirProdutos('Colar', 'colares-list');


function adicionarnocarrinho(categoria, id, valor, estoque) {
    const quantidadeDesejada = prompt(`Quantos produtos você deseja adicionar ao carrinho?`);
    const quantidade = parseInt(quantidadeDesejada, 10);
  
    if (isNaN(quantidade) || quantidade <= 0 || quantidade > estoque) {
        alert('Quantidade inválida ou maior que o estoque disponível.');
        return;
    }
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === id && item.categoria === categoria);
  
    if (itemIndex > -1) {
        cart[itemIndex].quantidade += quantidade;
    } else {
        cart.push({ categoria, id, valor, quantidade });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produto adicionado ao carrinho!');
    console.log('Carrinho:', cart);
  }
  
function getProducts(collection) {
    return db.collection(collection).get()
      .then((snapshot) => {
        console.log(snapshot);
        return snapshot;
      })
      .catch((error) => {
        console.error('Erro ao obter os produtos:', error);
        throw error;
      });}
  