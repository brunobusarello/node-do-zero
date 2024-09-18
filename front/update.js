const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const form = document.getElementById('myForm');
const api = 'http://localhost:3000/videos'

async function fetchItems(){
    const response = await fetch(`${api}?search=${id}`);
    const items = await response.json();
    const item = items[0]

    document.getElementById('input1').value = item.title
    document.getElementById('input2').value = item.description
    document.getElementById('input3').value = item.duration
}

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    
    const formData = new FormData(form)
    const data = {
        title: formData.get('input1'),
        description: formData.get('input2'),
        duration: formData.get('input3')
    }
    
    try {
        const response = await fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        if(response.ok){
            document.getElementById('input1').value = ''
            document.getElementById('input3').value = ''
            document.getElementById('input2').value = ''
            alert('Formulário atualizado com sucesso!')
            window.location.href = 'index.html'
        }
        else{
            alert('Erro ao atualizar os dados!')
        }
    } catch (error) {
        console.error(error)
    }
})

fetchItems()


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