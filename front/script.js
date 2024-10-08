var trava = 0
const form = document.getElementById('myForm');
const api = 'http://localhost:3000/videos'

form.addEventListener('submit', async function (event) {
  event.preventDefault(); // Impede o envio tradicional do formulário

  const formData = new FormData(form);
  const data = {
    title: formData.get('input1'),
    description: formData.get('input2'),
    duration: formData.get('input3')
  };

  try {
    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
        document.getElementById('input1').value = ''
        document.getElementById('input2').value = ''
        document.getElementById('input3').value = ''
        fetchItems()
        alert('Formulário enviado com sucesso!');

    } else {
      alert('Erro ao enviar o formulário.');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao enviar o formulário.');
  }
});

async function deleteSelected(id) {
    try {
        const resposta = await fetch(`${api}/${id}`, {
            method: 'DELETE', // Define o método HTTP como DELETE
            headers: {
                'Content-Type': 'application/json',
                // Adicione outros cabeçalhos se necessário, como autorização
            }
        });

        if (!resposta.ok) {
            throw new Error(`Erro: ${resposta.status} ${resposta.statusText}`);
        }
        
        // Se a exclusão for bem-sucedida
        fetchItems()
        alert(`Item com ID ${id} excluído com sucesso!`);
    } catch (erro) {
        console.error('Erro ao excluir o item:', erro);
    }
}

function update(values) {
  console.log(values)
}

// Função para buscar e atualizar a lista de itens cadastrados
async function fetchItems() {
  try {
    const response = await fetch(api);
    const items = await response.json();

    const table = document.querySelector('#tbody');

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // Popula a lista com os novos itens
    items.forEach(item => {
        // Crie uma nova linha (tr)
        const newRow = table.insertRow();

        // Crie e adicione células (td) na nova linha
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);

        // Adicione os valores nas células
        cell1.innerHTML = item.title;
        cell2.innerHTML = item.description;
        cell3.innerHTML = item.duration;
        cell4.innerHTML = `<button onclick="deleteSelected('${item.id}')">Deletar</button>`
        cell5.innerHTML = `<a href='editar.html?id=${item.id}')">Editar</a>`
    });
  } catch (error) {
    console.error('Erro ao buscar os itens:', error);
  }
}

// Chama a função para carregar os itens quando a página é carregada
if(trava == 0){
    fetchItems();
    trava++
}