
function voltar() {
    window.location.href = "../../pages/home/home.html";
  }

  function salvarproduto() {
    let colecao1 = document.getElementById("colecao").value;
    let nome1 = (document.getElementById("nome").value);
    let descricao1 = (document.getElementById("descricao").value);
    let preco1 = (document.getElementById("preco").value);
    let quantidade1 = parseFloat(document.getElementById("quantidade").value);
    let foto = document.getElementById("foto").files[0];  
  
    if (!foto) {
        alert('Por favor, selecione uma imagem.');
        return;
    }
  
    const storageRef = firebase.storage().ref();
    const fotoRef = storageRef.child(`${colecao1}/${foto.name}`);
  
    fotoRef.put(foto).then(snapshot => {
        return snapshot.ref.getDownloadURL();  
    }).then(fotoURL => {
  
    db.collection(colecao1).doc(nome1).set({
      descricao: descricao1,
      valor: preco1,
      estoque: quantidade1,

      foto: foto.name,
    })
    alert('Produto Salvo no Banco de Dados!');
  })}
  
  
  function excluirproduto() {
    let colecao1 = document.getElementById("colecaoDEL").value;
    let nome1 = (document.getElementById("nomeDEL").value);
  
    
  
    db.collection(colecao1).doc(nome1).delete().then(() => {
      console.log("Produto removido!");
      alert("Produto removido!");
    }).catch((error) => {
      console.error("Erro ao remover o produto: ", error);
    });
    
  }