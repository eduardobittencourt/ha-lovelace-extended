# HA Composable Card

Biblioteca em concepção para criar interfaces do Home Assistant com vínculos independentes por elemento, configuração visual e desempenho como prioridade.

**Estado:** documentação de produto. Sem implementação, pacote instalável ou versão publicada. O nome é provisório.

## A ideia

Um card reúne elementos visuais consistentes — ícone, textos, indicadores e controles — que podem mostrar dados e executar ações de entidades diferentes. Uma entidade principal fornece padrões; cada elemento pode substituir esses vínculos.

No MVP, o layout será fixo e terá o bloco nativo do HA como referência visual. A primeira aplicação é uma mesa com regulagem de altura: estado e controles de uma entidade `cover`, acompanhados de três botões de memória ligados a outras entidades. Tudo configurado pelo editor visual.

A visão de futuro é permitir posicionar elementos em um grid interno e oferecer receitas prontas construídas com essas mesmas peças. Isso deverá permitir experiências para luzes, impressoras 3D, aspiradores, máquinas de lavar e outros aparelhos representados por múltiplas entidades.

## Documentação

| Documento | Finalidade |
| --- | --- |
| [Manifesto](docs/manifesto.md) | Princípios e identidade do produto |
| [MVP](docs/mvp.md) | Escopo, caso da mesa e critérios de aceitação |
| [Arquitetura conceitual](docs/architecture.md) | Elementos, vínculos e limites técnicos propostos |
| [Roteiro](docs/roadmap.md) | Etapas pequenas, evidências e critérios para avançar |
| [Decisões e questões abertas](docs/decisions.md) | O que foi acordado e o que precisa ser decidido |
| [Research e discovery](docs/discovery.md) | Perguntas, métodos e evidências antes de assumir contratos |
| [OpenSpec](docs/openspec.md) | Fluxo SDD, configuração local e como iniciar changes |

## Como retomar

Leia o MVP e a primeira etapa pendente do roteiro. Use o mapa de discovery e o fluxo OpenSpec para resolver as questões necessárias para essa etapa, registrar evidência e atualizar os documentos afetados. Os checklists ainda desmarcados representam trabalho futuro, não funcionalidades existentes.

O próximo passo é uma change de pesquisa para conferir o caso real da mesa, contratos do frontend e o ambiente de validação. OpenSpec está configurado; nenhuma change de produto foi aberta. A implementação deve começar somente em uma tarefa posterior que a solicite.

## Limites atuais

Não foram escolhidos stack de implementação, versão mínima do HA, formato público de configuração, licença ou estratégia de distribuição. Não há promessa de compatibilidade com integrações ou aparelhos específicos.

O MVP utilizável no dashboard pessoal e a maturidade para divulgação ativa são marcos diferentes. A divulgação deve esperar a cobertura e a qualidade necessárias para substituir dashboards completos.
