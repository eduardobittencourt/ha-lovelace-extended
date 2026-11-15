# Decisões e questões abertas

Registro inicial derivado da conversa de produto. "Acordado" identifica direções expressas pelo usuário; "proposto" identifica escolhas que ainda precisam de validação.

## Acordado

| Decisão | Consequência |
| --- | --- |
| Desempenho é prioridade número um | Funcionalidades e dependências precisam justificar seu custo |
| Web Components são a direção técnica | Evitar camadas adicionais sem benefício demonstrado |
| Um card pode combinar várias entidades | Fonte e ação precisam poder variar por elemento |
| Flexibilidade de conteúdo e controle, com estilo delimitado | Linguagem visual e padrões de interação pertencem à biblioteca |
| Configuração visual é central | Recursos oficiais não devem exigir YAML manual |
| MVP com layout próximo ao bloco padrão do HA | Adiar composição livre para reduzir o escopo inicial |
| Mesa e suas três memórias são o primeiro problema real | A aceitação inicial depende dessa experiência completa |
| Futuro com elementos e receitas | Experiências prontas e próprias compartilham as peças |
| Divulgação ativa após maturidade para dashboards completos | Concluir o MVP pessoal não dispara divulgação |
| Trabalho atual é apenas documentação | Não iniciar implementação, instalação ou mudanças no HA nesta tarefa |

## Proposto, ainda sujeito a ajuste

- Nome provisório: `ha-composable-card`.
- Entidade principal como fonte de padrões, com substituições por elemento.
- MVP com composição fixa e regiões previstas para ações adicionais.
- Separação conceitual entre superfície, elementos, vínculos, editor e receitas.
- Roteiro incremental com critérios de saída, sem cronograma fechado.

## Resolver antes de implementar o MVP

1. Qual bloco e versão do HA serão a referência visual? Tile é uma possibilidade.
2. Quais dados, unidades, capacidades e ações a integração real da mesa oferece?
3. Quais tipos de fonte e ação são necessários no contrato inicial?
4. Como serão dispostas as regiões do layout e configuradas as ações adicionais?
5. Qual versão mínima do HA e qual matriz inicial de navegadores/dispositivos?
6. Quais métricas, cenários e limites concretos de desempenho serão adotados?
7. Qual stack mínima atende ao contrato do HA e ao editor com menor custo sustentável?

## Resolver quando a etapa exigir

- Sintaxe pública, versionamento e migrações da configuração.
- Regras de grid, responsividade, condições e estado temporário.
- Como transformar uma receita em uma composição personalizada.
- Receitas copiadas versus vinculadas e versionadas; ainda não há escolha.
- Descoberta de entidades e adaptadores específicos de integrações.
- Interface de extensões, se necessária, e seus limites de desempenho.
- Dashboard de referência e cobertura exigida para divulgação.
- Nome definitivo, licença, distribuição e publicação remota.

## Como registrar novas decisões

Anotar contexto, escolha, alternativas relevantes e consequência. Indicar se foi acordada com o usuário ou proposta para validação. Atualizar o documento de escopo afetado em vez de acumular decisões contraditórias apenas neste registro.
