// link API GItHub: https://api.github.com/users/USERNAME/repos (Lembrando que e um arquivo JSON)
// Link para a documentacao da API do GitHUb: https://docs.github.com/pt/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user
// O link esta no topico: List repositories for a user da documentacao. 

const repositorios = document.getElementById('repoList'); //criando uma constante com o elemento id que foi pego no arquivo html
const usern = document.querySelector('#username');  

function getRepos() {
    const username = usern.value.trim(); // traz o valor do input, ou seja, do nome que o usuario colocou na caixa de texto
    if (!username) {
        alert("Por favor, insira o nome de um usuário"); // avisa caso o campo esteja vazio, considerando um erro 
        return;
    }

    // faz a requisição para a API do GitHub utilizando o fetch, como foi pedido no requisito. Obs: o link dentro é o proprio link que esta na documentacao da API do GITHUB
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(async res => {
            if (!res.ok) {
                throw new Error('Erro ao acessar API'); // Mostra erro se a resposta nao for ok
            }
            
            let data = await res.json();
            repositorios.innerHTML = ''; // serve para limpa os repositórios anteriores, para que nao aconteca o erro de que sempre que o usuario colocar 
            // um novo usuario, os repositórios anteriores sejam mostrados novamente. 

            // mapeia os dados recebidos e cria os elementos HTML, que foi comentado no HTML
            data.map(item => {
                let box = document.createElement('div');
                box.classList.add('Box'); 
                // Abaixo esta o codigo HTML que foi criando no arquivo HTML e agora esta comentado, lembrando que caso nao tenha descicao, aparecera sem descricao!
                box.innerHTML = `
                <div>
                    <div>
                        <h4 class="title">${item.name}</h4>
                        <span class="Descricao">Descrição: ${item.description ? item.description : 'Sem descrição'}</span>
                    </div>
                    <div>
                        <a href="${item.html_url}" target="_blank">${item.html_url}</a>
                        
                    </div>
                </div>
                `;

                repositorios.appendChild(box);
            });
        })
        // Caso aconteca um erro na API do GitHub sera mostrada a mensagem de erro 
        .catch(err => {
            console.error(err);
            alert('Usuário não encontrado ou ocorreu um erro ao acessar a API.');
        });
}

document.getElementById('button').addEventListener('click', getRepos);
