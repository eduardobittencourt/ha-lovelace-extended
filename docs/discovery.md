# Research e discovery

Este documento é um mapa de perguntas e métodos, não um relatório de pesquisa concluída. As etapas de produto estão no [roadmap](roadmap.md); o fluxo de cada change está no [guia OpenSpec](openspec.md).

## Como trabalhar com evidência

Antes de uma decisão, identificar a pergunta, o que depende dela e a evidência suficiente para respondê-la. Consultar material anterior pertinente em `~/research/ha-composable-card/` e confirmar conclusões antigas na fonte atual.

Cada conclusão relevante precisa de fonte, data/versão, método, observação, limitações e consequência. Diferenciar fato observado, hipótese a testar e questão pendente. Documento oficial explica um contrato; leitura de código revela implementação; experimento demonstra apenas o cenário executado. Um mock não comprova comportamento físico.

Usar `research.md` da change para manter esse registro. Fontes públicas devem ter links e versões/commits quando necessários. Evidência bruta, clones e scripts de investigação ficam em `~/research/ha-composable-card/<tarefa>/`. Conclusões duráveis e sanitizadas pertencem ao repositório; não depender exclusivamente de caminhos locais que outro colaborador não poderá abrir.

## D0. Descoberta do problema e do contrato real da mesa

**Antes de:** especificar comportamento dependente da integração e concluir o MVP.

- Identificar os fluxos reais: consultar posição, mover a mesa e acionar cada memória; conferir quais controles de fato existem.
- Consultar por leitura as entidades, capacidades, atributos, unidades e ações relevantes. Não presumir domínio das memórias nem converter posição percentual em altura física sem base.
- Entender como a integração confirma recebimento, movimento e posição atingida, se oferecer essas informações.
- Registrar dimensões de uso e o que torna a solução atual insuficiente.

**Evidência de saída:** mapa sanitizado de papéis/dados/ações, limitações conhecidas e cenários de aceitação. Observação física é uma atividade distinta da consulta e exige escopo correspondente.

## D1. Descoberta visual e dos contratos do frontend

**Antes de:** escolher a referência, dependências e arquitetura inicial.

- Conferir o bloco nativo candidato na versão escolhida: regiões, estados, ações, tamanhos e comportamento no editor/Sections.
- Consultar documentação oficial e código pertinente dos contratos de card, editor, seletores, ações e dimensionamento.
- Identificar APIs documentadas, componentes internos e respectivos riscos de compatibilidade. Aparência nativa não exige acoplamento ao DOM privado.
- Avaliar como fontes e ações independentes podem ser editadas sem YAML, incluindo erros e indisponibilidade.
- Definir o recorte inicial de navegadores, idiomas, temas e dispositivos, sem presumir suporte universal.

**Evidência de saída:** referência visual identificada por versão, fluxos do editor, contratos utilizáveis e dúvidas técnicas que precisam de prova.

## D2. Baseline, alternativas e provas técnicas

**Antes de:** assumir stack definitiva e viabilidade de desempenho.

- Definir cenários comparáveis e medir a referência nativa e a solução atual quando fizer sentido; separar frio/quente e latência local/remota/física.
- Definir critérios de aceitação a partir do dispositivo alvo e das medições, com método reproduzível.
- Comparar a implementação mínima via Web Components e alternativas pertinentes, como Lit, sem transformar essa comparação em adoção antecipada.
- Provar vínculo com duas entidades, atualização seletiva, ciclo de vida e isolamento de eventos; conferir também alterações de tema e idioma.
- Verificar carregamento separado do editor e configuração persistida/reaberta. Medir custo conforme cresce o número de elementos/cards.

**Evidência de saída:** relatório de resultados, limitações, escolha justificada e decisão de avançar, ajustar ou descartar a abordagem.

Uma prova que precise de código deve ser uma change de experimento explicitamente delimitada. Seu sucesso não torna o protótipo automaticamente código de produção.

## D3. Validação da experiência e da integração

**Antes de:** declarar o MVP concluído.

- Validar os fluxos do editor desde uma configuração vazia até a edição após recarregar.
- Exercitar cenários sintéticos de erro, entidade ausente, indisponibilidade e reconexão, sem causar indisponibilidade no HA de produção só para testar.
- Planejar separadamente o teste físico dos comandos reais da mesa e registrar o que foi observado.
- Verificar toque, teclado, foco, nomes acessíveis, temas e tamanhos escolhidos.
- Observar uso cotidiano e repetir o protocolo de desempenho pertinente ao resultado final.

**Evidência de saída:** critérios do MVP demonstrados, divergências conhecidas e aceitação da substituição da solução atual pelo usuário.

## D4. Descoberta da reutilização e composição

**Antes de:** consolidar contratos públicos e desenvolver grid/receitas.

- Conferir necessidades reais de uma luz e de outra composição com múltiplas entidades.
- Identificar peças comuns e comportamentos de domínio, evitando generalizar somente a partir da mesa.
- Experimentar regras de grid, área mínima, adaptação e fluxos de edição com problemas de uso concretos.
- Comparar receita copiada e receita vinculada/versionada, incluindo personalizações, conflitos e migrações.

**Evidência de saída:** limites da abstração demonstrados e escolha do modelo de composição/receitas apoiada em cenários.

## D5. Descoberta de aparelhos compostos

**Antes de:** cada experiência especializada.

- Investigar um caso por vez: impressora, lavagem ou limpeza de múltiplos cômodos.
- Conferir capacidades e diferenças das integrações realmente selecionadas.
- Provar estado temporário e tradução de comandos quando necessário; verificar custos de mídia/histórico no cenário escolhido.

**Evidência de saída:** contrato e suporte delimitados por caso, sem alegar compatibilidade genérica a partir de uma única integração.

## D6. Descoberta de cobertura e manutenção

**Antes de:** divulgação ativa.

- Inventariar somente as experiências necessárias ao dashboard completo de referência e identificar lacunas.
- Validar atualização, migração e uso prolongado nas versões e dispositivos selecionados.
- Definir distribuição, licença e documentação com base no público e manutenção pretendidos.

**Evidência de saída:** matriz de cobertura demonstrada e limites públicos de suporte.

## Critério para seguir

Uma questão é bloqueante quando sua resposta pode mudar o escopo, contrato, arquitetura ou critério de aceitação da próxima entrega. Resolver antes dessa entrega, ou recortar uma change de investigação que a responda. Questões adiáveis precisam de justificativa e do marco em que voltarão a ser relevantes.

Não é necessário investigar todo o mapa em cada change. Quando evidência existente for suficiente, citá-la e explicar sua aplicabilidade. Quando a investigação refutar uma hipótese, atualizar proposta, design e tarefas afetadas antes de prosseguir.
