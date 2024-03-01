# MyReactFramework-WithMUI

Template pessoal para aplicações em React, utilizando `Vite.js` (toolchain) e Material UI (UI library)

[Acessar demo!](https://mrf-mui.bernardorohlfs.site/)

## Libs utilizadas

* `react-router-dom` para roteamento.
* `axios` para requisições HTTP.
* `sonner` para notificações.
* `react-imask` para máscaras de input.
* `@mui/icons-material` para importação de ícones.
* `@mui/material` para importação de componentes (UI).
* `@emotion/styled` e `@emotion/react` para estilização de componentes (UI).
* `@mui/x-date-pickers` para importação e uso de inputs de data.
* `react-hook-form` e `zod` para validação de formulário.
* `js-cookie` para gerenciar alguns dos cookies da aplicação.
* `dayjs` para manipulação de datas.
* `prettier` para formatação de código.

## Extensões do VS Code recomendadas

* `Color Highlight`.
* `Material Icon Theme`.

## Arquivo `.htaccess`

Um arquivo `.htaccess` é necessário para que a aplicação funcione corretamente após ser hospedada. Adicione o arquivo à pasta da aplicação no servidor FTP, com o seguinte conteúdo:

```
<IfModule mod_rewrite.c>

  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]

</IfModule>
```
