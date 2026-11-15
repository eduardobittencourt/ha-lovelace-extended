# Manifesto

Criar interfaces completas para o Home Assistant com composição de entidades, configuração visual, linguagem visual consistente e desempenho como fundamento.

## 1. Desempenho é a prioridade número um

Cada capacidade precisa justificar seu custo de carregamento, execução e memória. A direção é usar Web Components alinhados à plataforma do HA e evitar recursos extras sem benefício demonstrável.

Desempenho será verificado em uso real e dashboards completos. Escolher Web Components ou oferecer um único tipo de card não garante, por si só, rapidez.

## 2. A interface acompanha aparelhos, ambientes e tarefas

Uma experiência pode reunir várias entidades. Impressão, lavagem ou limpeza por cômodos devem poder ser apresentadas como atividades coerentes, com seus dados e controles relevantes.

No caso mais simples, todos os elementos podem usar uma mesma entidade. A composição deve crescer conforme a necessidade.

## 3. Liberdade de conteúdo e comportamento, com identidade visual

O usuário escolhe o que mostrar, de onde vêm os dados, quais ações executar e, futuramente, como organizar os elementos. A biblioteca define tipografia, espaçamento, estados, formatos de controles e padrões de interação.

Personalização estética pode existir por opções delimitadas, como temas, destaque e densidade. CSS ou JavaScript arbitrários não são requisitos do produto.

## 4. O editor visual é o caminho principal

Toda capacidade oficial deve ser acessível pelo editor visual. Configurar conteúdo, vínculos, ações e composições deve dispensar a edição manual de YAML.

Uma representação serializada continuará sendo necessária para persistência e interoperabilidade; seu formato ainda não está definido.

## 5. As peças das receitas estão disponíveis para quem personaliza

Experiências prontas devem usar os mesmos elementos e comportamentos oferecidos ao usuário. Receitas fornecem padrões úteis que podem ser adaptados, mantendo coerência visual.

Novos comportamentos podem exigir desenvolvimento, como um seletor de cômodos ou um adaptador para uma integração. Não se pressupõe que qualquer aparelho possa ser suportado apenas rearranjando elementos básicos.

## 6. Restrições protegem a experiência

Área mínima de toque, legibilidade, foco, teclado, contraste e adaptação ao espaço disponível fazem parte do produto. Liberdade de composição deve respeitar essas condições.

Informação desconhecida ou indisponível deve ser apresentada honestamente. O envio de um comando e a confirmação do resultado são estados diferentes.

## 7. Cobertura e qualidade precedem a divulgação ativa

O MVP deve resolver primeiro um problema pessoal concreto. A divulgação ativa deve esperar que o conjunto consiga substituir dashboards completos, com navegação, informação, controles cotidianos e experiências consistentes.

O dashboard de referência que comprovará essa cobertura ainda será definido. Suportar todo aparelho ou integração existente não é condição para esse marco.

## 8. Evolução preserva o trabalho do usuário

Compatibilidade, mudanças de configuração e migrações devem ser tratadas explicitamente. Opções públicas precisam de contratos claros; detalhes internos do HA não devem ser tratados como APIs estáveis sem verificação.
