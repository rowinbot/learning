# SOLID Programming

Based on the work of the Gang Of Four book.

## S: Single Responsability Principle
A class should only have one reason to change.

Separation of concerns. Different modules handles different tasks/problems (e.g storage vs analysis).

## O: Open / Closed Principle
A module should be open to extension but close for modification.

Modifying opens the way for breaking the code.

One should instead apply either composition or inheritance in order to extend the functionality of a given module/class.

## L: Liskov's Substitution Principle
A module that uses A class, should be able to use any of it subclasses without breaking the functionality.

This is specially important with abstractions like Rectangles => Squares where changing implementation details might end up changing the interface of the subclass.

One should instead extend functionality from class A but keep the interface of the superclass.

## I: Interface Seggregation Principle
Don't overload interfaces. Split into different interfaces.

Overloading interfaces leads to implementors having to discard/ignore interface properties wich ultimately fails the purpose of interfaces, triggering the principle of least surprise.

One should instead split the interface into different interfaces that every implementor adheres to without major problems. Apply YAGNI.

## D: Dependency Inversion Principle
High-level modules shouldn't directly depend on a low-level module but to a abstraction (abstract class, interface).

Directly depending on low-level modules makes it harder to refactor the code, tieing the high-level module to the low-level module' implementation.

One should instead create a low-level interface (specification/abstract class) that the low-level module should adhere to. Then on the high-level module we can use the interface to interact with the low-level module.

Final notes: Do not rely on implementation details.

## Other Terminologies
- Low level module: Focused on storage, I/O, low-level stuff.
- High level module: Focused on analysis, research.
- YAGNI: You Ain't Going to Need It.
- **Gamma Categorization** (Erich Gamma from GoF): 
  
  Creational Patterns: Construction of objects. Explicit and implicit (DI, reflection). Initialization: Wholesale (single statement) vs Piecewise (step-by-step).

  Structural Patterns: Concerned with structure (class members). Wrappers that mimic the underlying class' interface. API design (making it as convenient as possible).

  Behavioral Patterns: All different; no theme. Unique in approach.
```

```