#Webapp utilizando Knockout JS, Google Maps Api e Foursquare Api

Esse código em Javascript oferece um Webapp que permite o acesso ao google maps e lista locais de interesse fixos no código(hardcoded) para possivéis lanches da "refeição do lixo"(cheat meal em inglês).

**Esse projeto usou como base o código escrito por Richard Chain - Hong Kong Favorite Places Map - Google Maps API + Knockout.js**

##Versão

As versões utilizadas foram as seguintes:
**jquery-2.0.3.js**
**knockout-3.2.0.js**
**bootstrap-4.0.0.min.js**

##Procedimetos

* Primeiramente para executar o código, será necessário descompatar o arquivo, verificando se existem todos os arquivos necessários.
* No diretório de `/css` deve conter o arquivo **main.css**
* No diretório de `/js` deve conter o arquivo **app.js** 
* Outros arquivos necessários são as libs: **jquery-2.0.3.js**, **knockout-3.2.0.js**, **bootstrap-4.0.0.min.js** que devem estar no diretório de `/js/lib`
* na raiz do proejto deve conter o `index.html` que é o arquivo principal de execução pelo seu browser.
* As chaves utilizadas para google maps e fousquare api devem ser trocadas no arquivo `index.html` onde etá escrito **YOUR_APP_KEY** e no arquivo `app.js`nas variáveis globais **foursquareClientId** e **foursquareClientSecret** rescpectivamente


##Conteúdo

* `main.css`(Código fonte que realiza o mapemanto do layout e estilo da página).
* `app.js`(Código fonte que realiza a toda a lógca de consulta).
* `index.html`(Código fonte central para a execução e exibição).