# Arquitetura conceitual

Este documento registra direções e hipóteses. Não define uma API implementada, sintaxe de configuração ou stack fechada.

## Partes do sistema

1. **Superfície e layout:** apresentação do card e organização dos elementos. No MVP, composição fixa; futuramente, grid interno com restrições de tamanho e acessibilidade.
2. **Elementos:** ícone, texto, indicador, progresso, slider, botão, interruptor e seleção, incorporados conforme a necessidade de cada etapa.
3. **Vínculos e comportamentos:** leitura de estados/atributos, transformação de valores e execução de ações. Podem envolver entidades diferentes.
4. **Editor:** configuração visual dos recursos disponíveis e validação antes de persistir.
5. **Receitas futuras:** composições prontas usando os mesmos elementos e comportamentos.

Essas partes podem ser módulos internos. Não há requisito de criar pacotes separados nem um Web Component para cada fragmento de texto.

## Modelo de vínculos

A entidade principal é uma conveniência para herdar padrões, não uma limitação para todo o card. Elementos possuem identidades estáveis e podem substituir os vínculos relevantes.

Separar conceitualmente:

- Informação apresentada: estado, atributo, texto fixo ou valor derivado por um comportamento suportado.
- Interação: ação executada e seus parâmetros/destinos.
- Disponibilidade: condições necessárias para mostrar informação e habilitar ações.
- Estado temporário: seleção ou edição local que ainda não foi enviada ao HA.

Nem todo elemento precisa desses quatro recursos. O MVP implementa apenas os contratos necessários à mesa; futuras seleções de cômodos precisarão de estado temporário e tradução para os comandos da integração.

Um elemento visual reutilizável não resolve sozinho a semântica de um domínio: brilho, velocidade e temperatura podem compartilhar um slider, mas precisam de escalas e comandos próprios. Controles suportados devem incluir essa tradução, para evitar lógica repetida em cada receita.

## Integração com o HA

- Direção acordada: Web Components, usando os contratos de custom cards e edição disponíveis na versão alvo.
- O HA organiza o card no dashboard; o layout interno pertence à biblioteca.
- Usar a aparência nativa como referência não obriga a depender de componentes internos não documentados.
- Reuso de componentes do HA, Lit, ferramentas de build, estratégias de dados e versões mínimas precisam de avaliação posterior.
- Nesta etapa não há necessidade estabelecida de integração Python ou serviço adicional.

## Desempenho

Hipóteses a validar na prova técnica:

- Preparar estrutura e vínculos quando a configuração mudar, evitando refazer esse trabalho a cada estado recebido.
- Atualizar apenas os elementos afetados, considerando também mudanças relevantes de idioma, tema e contexto.
- Evitar assinaturas e requisições duplicadas; liberar recursos ao remover o card.
- Separar o carregamento do editor do uso cotidiano.
- Carregar recursos especializados conforme a necessidade e evitar trabalho de conteúdo oculto.
- Manter interações locais fluidas e controlar a frequência de envio de comandos quando aplicável.

O custo deve ser medido em relação à quantidade de elementos e vínculos. Um motor genérico também pode gerar sobrecarga; seu benefício depende da implementação e da evidência.

## Receitas e evolução

Receitas definirão elementos, layout, vínculos e padrões. Tanto receitas quanto composições próprias deverão usar os mesmos contratos.

Ainda está aberta a escolha entre copiar a receita para uma composição independente ou manter vínculo versionado com substituições locais. A sugestão anterior de vínculo versionado é uma hipótese, não uma decisão aceita. A avaliação deve incluir migrações, mudanças de identificadores, conflitos e comportamento após remoção de elementos.

## Referências para a futura investigação

- [Custom cards do HA](https://contributors.home-assistant.io/frontend/custom-ui/card/)
- [Editor e seletor de cards](https://contributors.home-assistant.io/frontend/custom-ui/card-editor/)
- [Custom card features](https://contributors.home-assistant.io/frontend/custom-ui/card-feature/)
- [Tile](https://www.home-assistant.io/dashboards/tile/) e [Sections](https://www.home-assistant.io/dashboards/sections/)
- [Button Card](https://github.com/custom-cards/button-card), inspiração para a flexibilidade de composição.

Conferir os contratos na versão do HA escolhida antes de implementar. Mushroom, UI Lovelace Minimalist e Bubble Card foram referências na discussão de produto; esta documentação não depende de comparações permanentes de suas funcionalidades.
