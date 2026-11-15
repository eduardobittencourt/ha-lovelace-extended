# OpenSpec no projeto

## Configuração

Inicializado com OpenSpec **1.14.3**, integração **Codex**, perfil **core** e artefatos em português. A CLI é a já instalada na devbox; não foi adicionada dependência de runtime ou ferramenta de build ao produto.

- [Configuração](../openspec/config.yaml): contexto enxuto, regras por artefato e orientações para apply/archive.
- [Schema local research-first](../openspec/schemas/research-first/schema.yaml): derivado do `spec-driven`, com um artefato de pesquisa e dependências adicionais.
- [Template de pesquisa](../openspec/schemas/research-first/templates/research.md): fatos, hipóteses, questões, experimentos e resultados.
- Skills geradas em `.agents/skills/`, versionadas no projeto. Não editar manualmente o conteúdo gerado para personalizar o processo; usar config, schema e documentos.

Não há change de produto aberta nem especificação de runtime consolidada. Os diretórios de specs/changes são inicialmente vazios. A configuração desta ferramenta não muda o estágio de maturidade do card.

## Verificação da configuração inicial

Schema validado com `openspec schema validate research-first --json`, sem issues. Duas changes descartáveis verificaram a seleção do schema padrão, as dependências de `research`, a injeção de contexto/regras e o bloqueio de apply sem tarefas: uma com specs e outra de pesquisa com `skip_specs: true`. Ambas foram removidas após a conferência. Nenhuma pesquisa de produto ou teste físico foi executado por essa validação.

## Fontes de contexto

`docs/` mantém intenção do produto, limites e roteiro. `openspec/changes/<nome>/` mantém proposta, investigação, deltas, design e tarefas de uma entrega delimitada. `openspec/specs/` recebe contratos consolidados conforme changes concluídas forem sincronizadas/arquivadas; não copiar toda a visão futura para lá como se já estivesse pronta.

As skills consultam as instruções retornadas pela CLI, que incluem o contexto e regras configuradas. Links no contexto não inserem automaticamente o conteúdo dos documentos: o agente deve ler os arquivos relevantes. Consultar o [mapa de discovery](discovery.md) conforme a etapa.

## Fluxo

1. **Explorar:** entender a pergunta e consultar as fontes pertinentes, sem implementar. No Codex, usar `$openspec-explore` com o assunto.
2. **Propor:** usar `$openspec-propose` para uma entrega pequena. O schema é resolvido pela configuração local.
3. **Pesquisar:** preencher `research.md` com evidência existente e pendências. Specs e design dependem desse arquivo.
4. **Especificar e planejar:** criar deltas quando houver mudança de comportamento, design proporcional e tarefas verificáveis.
5. **Aplicar:** usar `$openspec-apply-change` quando a execução estiver solicitada. Uma change de pesquisa executa pesquisa e documentação, não implementação do produto.
6. **Validar e arquivar:** conferir resultados, coerência das specs e atualização dos documentos; então usar `$openspec-archive-change` quando apropriado.

O perfil core também inclui `$openspec-update-change` e `$openspec-sync-specs`. Se o cliente ainda não reconhecer as skills recém-geradas, abrir uma sessão no diretório do projeto ou usar a CLI diretamente, conforme os comandos abaixo.

## Proposta de primeira change

Sugestão para quando o usuário iniciar o trabalho, ainda não criada:

> Usar openspec-propose para a change descobrir-contrato-mesa-e-frontend, etapa 0 do roadmap, com entrega somente de pesquisa e documentação. Conferir por leitura os contratos reais da mesa e do frontend do HA; definir o que falta validar e um protocolo de desempenho. Não implementar o card nem executar comandos físicos. Registrar evidências e deixar em aberto decisões que precisem de experimento.

Para uma investigação sem alteração de comportamento do produto, listar nenhuma capacidade nova/modificada e definir `skip_specs: true` no `.openspec.yaml` dessa change, preservando os demais campos gerados. O CLI pode então pular specs. Não inventar requisito de runtime apenas para satisfazer validação.

Se uma resposta exigir protótipo, a entrega dessa pesquisa pode ser a especificação de uma change de experimento posterior. Não presumir os resultados de testes ainda não executados para fechar um design de produção.

## CLI de apoio

Executar na raiz do projeto:

```sh
openspec list --json
openspec list --specs
openspec schema validate research-first
```

Quando for abrir uma change, o comando abaixo usa o schema padrão do projeto:

```sh
openspec new change descobrir-contrato-mesa-e-frontend
openspec status --change descobrir-contrato-mesa-e-frontend --json
openspec instructions proposal --change descobrir-contrato-mesa-e-frontend --json
```

`new change` cria o diretório e os metadados; os documentos devem ser escritos seguindo `instructions`. Consultar novamente o status e as instruções de cada artefato pronto (`proposal`, `research`, `specs`, `design`, `tasks`) e de `apply` antes de avançar. Não substituir a inspeção do status por uma sequência cega de comandos.

Para uma change com os artefatos preenchidos:

```sh
openspec validate descobrir-contrato-mesa-e-frontend --strict --no-interactive
```

## O que a ferramenta verifica

O schema estabelece dependências de arquivos. A existência de `research.md` não prova que as perguntas foram respondidas; a validação estrutural não audita fontes, desempenho ou comportamento físico. Regras de contexto e orientações de operação são instruções ao agente, não bloqueios de segurança executáveis.

O agente deve verificar se as evidências sustentam os artefatos seguintes. Uma change de investigação pode ter plano e tarefas de pesquisa ainda pendentes; uma change de produção deve resolver os bloqueadores antes de assumir contratos dependentes.

## Manutenção

`openspec update --help` descreve a regeneração das integrações. Atualizar somente no escopo de uma tarefa de manutenção; usar perfil core e revisar o diff. Conferir novamente a resolução do schema, dependências, regras e skills após uma atualização. Schemas locais são uma funcionalidade experimental do OpenSpec; o fork deve ser revisto perante mudanças upstream.

Referências oficiais: [customização](https://github.com/Fission-AI/OpenSpec/blob/main/docs/customization.md) e [fluxo OPSX](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md). A CLI instalada é a referência para os comandos efetivamente disponíveis neste ambiente.
