Excelente base. Cobertura sugerida:

- `TSBox`: contêiner genérico de layout/composição.  
  Cobre: `div`, `section`, `article`, `main`, `aside`, `header`, `footer`, `nav` (via `as`).

- `TSStack`: layout vertical com espaçamento consistente.  
  Cobre: `div` com `flex-col`, `gap-*`, alinhamento vertical.

- `TSInline`: layout horizontal com espaçamento consistente.  
  Cobre: `div` com `flex-row`, `gap-*`, wrap e alinhamento horizontal.

- `TSText`: tipografia de corpo/legenda/feedback.  
  Cobre: `p`, `span`, `small`, `strong` (via variantes e `as`).

- `TSHeading`: títulos semânticos.  
  Cobre: `h1` a `h6` com escala tipográfica padronizada.

- `TSSurface`: bloco visual (card/panel/section decorada).  
  Cobre: `div` estilizada com fundo, borda, sombra, padding e variantes (`default`, `muted`, `danger`, etc.).

- `TSField`: “casca” de campo de formulário.  
  Cobre: wrapper de `label + control + hint + error` e estado (`invalid`, `disabled`, `required`).

- `TSForm`: form semântica + integração com submit/validação.  
  Cobre: `form` e padrão de submit/erro global/fieldset.

- `TSButton`: ação clicável padronizada.  
  Cobre: `button` e link com aparência de botão (`asChild`), variantes (`primary`, `secondary`, `success`, `destructive`, `ghost`).

- `TSInput`: entrada textual padrão.  
  Cobre: `input` (`text`, `email`, `password`, `number`, etc.) com estados (`error`, `disabled`).

- `TSSelect`: seleção de opções padronizada.  
  Cobre: `select`/combobox (idealmente com Radix Select para UX melhor).

Regra prática:

- Layout: `TSBox`, `TSStack`, `TSInline`, `TSSurface`.
- Tipografia: `TSText`, `TSHeading`.
- Formulário: `TSForm`, `TSField`, `TSInput`, `TSSelect`, `TSButton`.
