const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function fetchItems(){
    const response = await fetch(`https://node-do-zero-m5pb.onrender.com/videos?id=${id}`);
    const items = await response.json();

    console.log(items)
}



        // // Fazer uma requisição GET para buscar os dados específicos dessa linha
        // fetch(`https://sua-api.com/itens/${id}`)
        //     .then(response => response.json())
        //     .then(dados => {
        //         document.getElementById('id').value = dados.id;
        //         document.getElementById('nome').value = dados.nome;
        //     });

        // // Enviar o formulário via POST com as alterações
        // document.getElementById('editar-form').addEventListener('submit', function(event) {
        //     event.preventDefault();

        //     const dadosAlterados = {
        //         id: document.getElementById('id').value,
        //         nome: document.getElementById('nome').value
        //     };

        //     fetch('https://sua-api.com/itens', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(dadosAlterados)
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         alert('Dados atualizados com sucesso!');
        //     })
        //     .catch(error => {
        //         console.error('Erro ao atualizar os dados:', error);
        //     });
        // });