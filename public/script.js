function init(){

    //chamar categoria
    carregarGrupos();

    //chamar produtos em promoção
    carregarProdutosPromocao();

    //chamar produtos por categoria
    carregarCategoria();

}

function carregarGrupos(){
    var categoria = [
        {
            "codigo":0,
            "nome":"Hamburgues"
        },
        {
            "codigo":1,
            "nome":"Carne na chapa"
        },
        {
            "codigo":2,
            "nome":"Porções"
        },
        {
            "codigo":3,
            "nome":"Bebidas"
        }
    ];

    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "categorias.json", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            categorias = JSON.parse(xhr.responseText);
            for (let index = 0; index < categorias.length; index++) {
                var categoria = categorias[index];
                rederizarGrupos(categoria); //Itens em Promoção
            }
        } else {
            console.error("Falha ao carregar json:" + xhr.status);
        }
    };
    xhr.send();
    return categoria;
}

function carregarProdutosPromocao(){
    var produtos = [];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "produtos.json", true);
    xhr.onload = function() {
        if (xhr.status === 200) {

            produtos = JSON.parse(xhr.responseText);

            for (let index = 0; index < produtos.length; index++) {
                var produto = produtos[index];
                rederizarRecomendado(produto); //Itens em Promoção
            }
        } else {
            console.error("Falha ao carregar json:" + xhr.status);
        }
    };
    xhr.send();
    return produtos;
}

function carregarCategoria(){
    var categoria = [];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "categorias.json", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            categorias = JSON.parse(xhr.responseText);
            for (let index = 0; index < categorias.length; index++) {
                var categoria = categorias[index];
                rederizarCategoria(categoria); //Itens em Promoção
            }
        } else {
            console.error("Falha ao carregar json:" + xhr.status);
        }
    };
    xhr.send();
    return categoria;
}

function carregarProdutos(categoria){
    var produtos = [];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "produtos.json", true);
    xhr.onload = function() {
        if (xhr.status === 200) {

            produtos = JSON.parse(xhr.responseText);

            for (let index = 0; index < produtos.length; index++) {
                var produto = produtos[index];
                rederizarProduto(categoria, produto);
            }
        } else {
            console.error("Falha ao carregar json:" + xhr.status);
        }
    };
    xhr.send();
    return produtos;
}

//Rederizações
function rederizarGrupos(grupo){

    var item = document.createElement('li');
    item.className = 'item-grupo';

    item.innerHTML = '<a href="#grupo_'+grupo.codigo+'"><span>'+grupo.nome+'</span></a>';

    const listItem = document.getElementById("grupos");
    listItem.appendChild(item);

}

function rederizarRecomendado(produto){
    if(produto.promocao){
        var item = document.createElement('li');
        item.className = 'card-recomendacoes';

        item.innerHTML = '<img src="imagens/'+produto.imagem+'" alt="'+produto.nome+'">'+
                        '<div>'+
                            '<div><span class="nome-produto">'+produto.nome+'</span></div>'+
                            '<div><span class="preco-produto">'+formatarMoeda(produto.preco)+'</span></div>'+
                        '</div>';

        const listItem = document.getElementById("recomendacoes");
        listItem.appendChild(item);
    }
}

function rederizarCategoria(categoria){

    var grupo = document.createElement('div');

    grupo.innerHTML = '<h2 id="grupo_'+categoria.codigo+'" class="titulo-grupos">'+categoria.nome+'</h2>';

    var ur = document.createElement('ur');
    ur.id = 'categoria_'+categoria.codigo;

    const produtos = document.getElementById("produtos"); 
    grupo.appendChild(ur); //Salvando <ur> dentro da div
    produtos.appendChild(grupo); // salvando div dentro do elemento produto

    carregarProdutos(categoria);

}

function rederizarProduto(categoria, produto){

    if(produto.categoria === categoria.codigo){
        var item = document.createElement('li');
        item.className = 'card-produtos';

        item.innerHTML = '<img src="imagens/'+produto.imagem+'" alt="'+produto.nome+'">'+
                            '<div>'+
                                '<div><span class="nome-produto">'+produto.nome+'</span></div>'+
                                '<div><span class="nome-descricao">'+produto.descricao+'</span></div>'+
                                '<div><span class="preco-produto">'+formatarMoeda(produto.preco)+'</span></div>'+
                            '</div>';

        const produtos = document.getElementById("categoria_"+categoria.codigo);
        produtos.appendChild(item);
    }
}

//Formatações
function formatarMoeda(valor){
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

init();