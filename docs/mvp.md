# MVP: um card familiar com vínculos independentes

## Problema

O usuário tem uma mesa com regulagem de altura. Uma entidade `cover` reúne as informações e controles principais, mas as três memórias são acionadas por outras entidades. O objetivo é reunir esses controles em um único card, configurado visualmente.

Os IDs, domínios das memórias, atributos disponíveis e ações exatas ainda precisam ser conferidos. Este documento não presume que as memórias sejam entidades `button`, nem que a altura esteja disponível em centímetros.

## Experiência proposta

Usar o bloco nativo do HA como referência de layout e aparência. A referência exata será definida antes da implementação; Tile é um candidato, não uma decisão firmada.

O card terá uma composição fixa, com regiões previstas para ícone, título, subtítulo/estado, controles principais e ações adicionais. O posicionamento e os limites dessas regiões ainda serão especificados.

| Parte | Configuração esperada no caso da mesa |
| --- | --- |
| Ícone e textos | Padrões da entidade principal e substituições previstas no editor |
| Estado ou posição/altura | Informação disponível na entidade `cover`, preservando seu significado e unidade |
| Controles principais | Ações suportadas pela mesa, conferidas na integração |
| Três ações adicionais | Botões com rótulos próprios e vínculos independentes para cada memória |
| Ação do corpo do card | Configurável separadamente das ações dos elementos |

Uma entidade principal fornece valores padrão. Cada elemento pode usar outro vínculo. Fonte de informação e destino de ação são conceitos independentes; o contrato inicial deve cobrir o caso real sem exigir um editor universal de expressões.

## Incluído

- Um tipo de card com layout fixo e linguagem visual alinhada à referência escolhida.
- Editor visual para toda funcionalidade entregue, incluindo vínculos e ações adicionais.
- Entidade principal e substituição por elemento para as regiões suportadas.
- Exibição de informação e controles suficientes para operar a mesa, incluindo as três memórias.
- Tratamento de indisponibilidade, entidades ausentes, configuração inválida e falha de ação.
- Controles internos que não disparem acidentalmente a ação do corpo do card.
- Persistência da configuração, edição posterior e comportamento coerente após reconexão.
- Verificação de desempenho e acessibilidade no ambiente de referência.

## Adiado

- Grid livre, arrastar elementos e layouts arbitrários.
- Catálogo de receitas, importação, compartilhamento e atualização de receitas.
- Seleção de múltiplos cômodos e outras interações compostas.
- Cards completos de impressora 3D, máquina de lavar ou outros aparelhos.
- Sistema geral de condições e expressões, CSS ou JavaScript arbitrários.
- Marketplace, infraestrutura de publicação e divulgação ativa.

## Critérios de aceitação

- [ ] Adicionar e configurar o card apenas pelo editor visual, sem editar YAML.
- [ ] Escolher a entidade principal da mesa e apresentar corretamente a informação disponível.
- [ ] Acionar os controles principais suportados sem mudar o significado dos comandos.
- [ ] Configurar e acionar individualmente as três memórias a partir do mesmo card.
- [ ] Preservar a independência entre os controles internos e a ação do corpo.
- [ ] Salvar, recarregar e editar a configuração sem perder os vínculos.
- [ ] Exibir indisponibilidade e erros sem indicar sucesso indevido.
- [ ] Não representar uma memória como posição atingida sem evidência fornecida pelo dispositivo.
- [ ] Funcionar por toque e teclado, com foco e nomes acessíveis, nas dimensões escolhidas.
- [ ] Passar pelo protocolo de desempenho definido antes da implementação.
- [ ] Substituir a solução atual da mesa e ser validado em uso cotidiano pelo usuário.

## O que comprova o MVP

Um problema real resolvido com configuração visual e vínculos independentes. Isso não comprova cobertura de dashboards completos nem suporte genérico a todos os `cover`.
