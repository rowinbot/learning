# Factory (Factory Method & Abstract Factory)
Used when:
- Creation logic becomes too convoluted.
- Initializer is not descriptive (constructor handles subcases).
- In situations / languages (e.g JavaScript) where you cannot overload constructors.

Can lead into "optional parameter hell".

Wholesale object creation outsourcer as:
- A separate method (Factory Method).
- A separate Factory class.
- A hierarchy of factory classes (Abstract Factory).

When handling multiple subcases in the constructor, applying factory patterns helps to apply the Open / Close Principle by enabling the extension of subcases without modifying the buildee class.

## Factory Method
Can be created as static methods of the enclosing class. Manufactures a new object making the parameter names self-descriptive when handling subcases.

## Factory
Following the Single Responsability Pattern, we put the buildee construction process on the Factory class. Tho there's no standard for exposing the factory, we can make a static interface from the factory and, for more complex objects we can even use the factory's constructor.

A factory can even manufacture different objects leveraging polymorphism

## Abstract Factory
Having an abstract factory, we apply the open / closed principle by not relying on specific factories when building a hierarchy of objects.

When manufacturing a hierarchy of objects, we use an abstract factory that "implements" the interface of the hierarchy' base class. Afterwards we create all the needed subclasses of factories.

Then using the abstract factory, we get its inheritors and instantiate them. 

## Terminology
- Factory. A module / class that is solely responsible for the wholesale creation of objects.