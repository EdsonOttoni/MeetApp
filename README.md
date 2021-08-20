# MeetApp.

Este projeto se trata de uma API de um app agregador de
eventos chamado MeetApp (um acrônimo à Meetup + App).

Onde os organizadores poderiam divulgar seus
eventos e os usuários poderiam marcar sua presenças nos
respectivos eventos.

## Funcionalidades do projeto.
### Autenticação.
O usuário se autentica usando e-mail e senha, onde isso gera um JWT e com isso realiza a validação dos dados de entrada.

### Cadastro e atualização de usuários.
Para se cadastrar o usuário deve fornecer o ``nome, email e senha``

Para atualizar a senha, o usuário deve também enviar um campo de ``confirmação de senha``.
Sua nova senha é criptografada e salva no banco de dados.

### Gerenciamento de arquivos.
- Uma rota upload foi criada, a qual usuário envia o arquivo que é salvo na maquina local, no entanto o ``caminho`` e ``nome`` do arquivo é salvo em uma tabela do banco de dado, a rota upload retorna todos dados do arquivo cadastrado.

### Gerenciamento de meetups.
1. O usuário cadastra meetups na plataforma com o ``título`` do meetup, ``descrição``, ``localização``, ``data e hora`` e a ``imagem`` (banner).

2. O qual não possível cadastrar meetups com `datas` que já passaram,
usuário também pode editar todos dados de meetups que ainda não aconteceram sendo que ele é organizador do evento.

3. Os meetups que são organizados pelo usuário logado podem ser listado por eles.

4. O usuário pode cancelar meetups organizados por ele e que ainda não aconteceram. O cancelamento deleta o meetup da base de dados.

### Inscrição no meetup.
1. O usuário so pode se inscrever em meetups que não organiza.

2. O usuário não pode se inscrever em meetups que já aconteceram.

3. O usuário não pode se inscrever no mesmo meetup duas vezes.

4. Sempre que um usuário se inscrever no meetup, uma notificação é enviada ao organizador contendo os dados relacionados ao usuário inscrito.

### Listagem de meetups.
Foi criada uma rota para listar os meetups por filtro de ``data``, os resultados dessa listagem são paginados em 10 itens por página. Abaixo tem um exemplo de chamada:

```sh
http://localhost:3000/list/meetups?date=2021-11-25&pag=1
```
Nessa listagem retorna também os dados do organizador.

## Iniciando o projeto.

Primeiramente instala as dependências;
```sh
yarn

# OU
npm install
```
### Configuração da base de dados.
Crie um aquivo ``.env`` e preencha os dados de acordo com o arquivo `.env.development`

### Execução de migrations.

```sh
yarn sequelize db:migrate

# OU
npx sequelize-cli db:migrate
```
## Startando o projeto.
Para startar o projeto basta da o seguinte comando:

```sh
yarn dev

# OU
npm dev
```

