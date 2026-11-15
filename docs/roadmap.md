# Roteiro incremental

Todas as etapas abaixo estão pendentes. Não há prazo ou implementação implícita. Cada etapa deve produzir uma evidência pequena e revisável antes da seguinte.

## 0. Especificar o caso real e os limites iniciais

- [ ] Conferir, por leitura, entidades, atributos, capacidades e ações da mesa.
- [ ] Registrar apenas o contrato necessário, sem credenciais ou inventários privados.
- [ ] Escolher o bloco nativo e a versão do HA usados como referência visual.
- [ ] Definir regiões do layout fixo e os fluxos do editor para a mesa.
- [ ] Definir versão alvo, dispositivo/navegador e dimensões de referência.
- [ ] Registrar baseline e limites de aceitação de desempenho antes de implementar.

**Saída:** especificação curta que permita verificar os critérios do MVP sem depender de suposições sobre a integração.

## 1. Provar o contrato mínimo do card

Em uma tarefa futura de implementação:

- [ ] Criar a menor superfície possível com dois elementos ligados a entidades diferentes.
- [ ] Configurar ambos visualmente e persistir a configuração.
- [ ] Executar uma ação independente e verificar o isolamento de eventos.
- [ ] Medir atualizações provocadas por entidades relevantes e não relacionadas.
- [ ] Registrar a escolha de stack e seus custos com base na prova.

**Saída:** evidência de que o modelo de vínculos e o editor funcionam com custo aceitável. Não requer grid livre nem framework de receitas.

## 2. Concluir o MVP da mesa

- [ ] Entregar a composição fixa, controles e três ações de memória.
- [ ] Completar os fluxos de criação e edição visual.
- [ ] Validar falhas, indisponibilidade, reconexão e persistência.
- [ ] Conferir toque, teclado, foco, tamanhos e temas escolhidos.
- [ ] Executar a validação física planejada com o usuário, considerando o movimento real da mesa.
- [ ] Demonstrar todos os critérios de [aceitação](mvp.md#critérios-de-aceitação).

**Saída:** um card que substitui a solução atual da mesa no dashboard pessoal.

## 3. Validar reutilização em experiências simples

- [ ] Aplicar as mesmas peças a uma luz e a outra composição de múltiplas entidades.
- [ ] Identificar o que é visual, vínculo e comportamento de domínio.
- [ ] Ampliar somente as peças necessárias e repetir a medição de desempenho.
- [ ] Avaliar estabilidade de configuração e atualização entre versões da biblioteca.

**Saída:** demonstração de que o modelo atende mais de um aparelho sem acumular exceções específicas no núcleo.

## 4. Introduzir composição livre e receitas

- [ ] Definir o contrato público dos elementos e as restrições do grid interno.
- [ ] Permitir adicionar, remover, mover e redimensionar elementos visualmente.
- [ ] Definir regras de adaptação ao espaço disponível.
- [ ] Implementar receitas com os mesmos contratos das composições próprias.
- [ ] Decidir e validar cópia versus vínculo versionado de receitas.

**Saída:** liberdade de composição utilizável sem YAML, com identidade visual e custo controlado.

## 5. Atender experiências compostas

- [ ] Escolher um caso por vez: impressora 3D, aspirador com múltiplos cômodos ou máquina de lavar.
- [ ] Mapear capacidades e diferenças entre integrações sem inventar informações indisponíveis.
- [ ] Introduzir estado temporário, comportamentos ou adaptadores apenas quando necessários.
- [ ] Tratar recursos caros, como câmera e histórico, com carregamento e ciclo de vida explícitos.

**Saída:** uma experiência completa e validada por caso, com peças reaproveitáveis e limites de suporte documentados.

## 6. Atingir maturidade para divulgação ativa

- [ ] Definir o dashboard completo de referência e sua matriz de cobertura.
- [ ] Cobrir navegação, informação, controles cotidianos, detalhes e estados de falha.
- [ ] Validar uso prolongado em celular, tablet e desktop escolhidos.
- [ ] Definir e exercitar compatibilidade, migração e recuperação de configuração.
- [ ] Documentar instalação, uso, limitações e processo de atualização.
- [ ] Definir licença, nome definitivo e canal de distribuição.

**Saída:** evidência de substituição de um dashboard inteiro com qualidade consistente. Só então iniciar divulgação ativa.

## Protocolo de desempenho a especificar na etapa 0

Registrar ambiente, cenário e método antes de fixar metas numéricas. Medir carregamento frio/quente, transferência e execução de JavaScript, resposta aos controles, memória após uso e ciclos de montagem/remoção, além do trabalho causado por atualizações de entidades não relacionadas.

Comparar com a referência nativa e com a solução atual da mesa quando houver equivalência de cenário. Separar latência da interface, comunicação com o HA e resposta física do aparelho. Não atribuir à biblioteca toda a latência de um comando.

Resultados e limites devem acompanhar a implementação correspondente; ainda não existem medições ou promessas numéricas.
