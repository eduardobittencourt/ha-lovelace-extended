# Manifesto

Build complete Home Assistant interfaces with entity composition, visual configuration, a consistent visual language, and performance as a foundation.

## 1. Performance is the number one priority

Every capability must justify its loading, execution, and memory costs. The direction is to use Web Components aligned with the HA platform and avoid extra resources without demonstrated benefit.

Performance will be verified in real use and complete dashboards. Choosing Web Components or exposing a single card type does not guarantee speed by itself.

## 2. The interface follows devices, rooms, and tasks

An experience can bring together several entities. Printing, washing, or cleaning selected rooms should be presented as coherent activities with their relevant information and controls.

In the simplest case, all elements can use the same entity. Composition should grow with the user's needs.

## 3. Freedom of content and behavior within a visual identity

Users choose what to show, where data comes from, which actions to execute, and eventually how to arrange elements. The library defines typography, spacing, states, control shapes, and interaction patterns.

Visual customization can use bounded options such as themes, accent colors, and density. Arbitrary CSS or JavaScript is not a product requirement.

## 4. The visual editor is the primary path

Every officially supported capability must be accessible through the visual editor. Configuring content, bindings, actions, and compositions must not require manual YAML editing.

A serialized representation will still be needed for persistence and interoperability; its format is not yet defined.

## 5. Recipe building blocks are available to users

Ready-made experiences must use the same elements and behaviors exposed to users. Recipes provide useful defaults that can be adapted while retaining visual consistency.

New behaviors may require development, such as a room selector or an integration adapter. Supporting every device by rearranging basic elements alone is not assumed.

## 6. Constraints protect the experience

Minimum touch targets, readability, focus, keyboard access, contrast, and adaptation to available space are part of the product. Composition freedom must respect these requirements.

Unknown or unavailable information must be represented honestly. Sending a command and confirming its result are different states.

## 7. Coverage and quality precede active promotion

The MVP should first solve a concrete personal problem. Active promotion should wait until the library can replace complete dashboards, with navigation, information, everyday controls, and consistent experiences.

The reference dashboard that will demonstrate this coverage is still to be defined. Supporting every existing device or integration is not a condition for this milestone.

The project is intended to be open source from the outset. Public development and contributions do not require claiming dashboard-wide maturity before it has been demonstrated.

## 8. Evolution preserves users' work

Compatibility, configuration changes, and migrations must be addressed explicitly. Public options need clear contracts; HA internals must not be treated as stable APIs without verification.

## 9. English is the project language

Documentation, specifications, examples, code, comments, commit messages, and default product text use English. Research conclusions preserved in the repository follow the same rule. The language used in conversations with maintainers does not change this policy.
