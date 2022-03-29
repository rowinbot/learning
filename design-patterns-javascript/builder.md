# Builder Pattern
When piecewise object construction is complicated, provide an API for doing it succintly.

A Builder is a separate component / object that lets you construct an (complex) object easily. Provides a nice API to interact with the buildee object.

We can provide a factory method on the buildee class to hint that it shouldn't be interacted with directly but rather with a builder.

Usually provide a "finalization" step / method. This method may return the buildee object.

## Builder Facets
When building up a complex object, we might want to split the initialization process into multiple builders in which each sub-builder initializes a facet of the object.

Whilst implementing this interaction between multiple builders for an object, we may add a base builder that exposes the builders for every facet of the object.

Having the sub-builders inherit from the base class that exposes every sub-builders makes it easier for the user to construct the object using a fluent interface where we can jump from a sub-builder to another one when initializing it.

## Other Terminologies
- Fluent interface: Return a reference to the containing object enabling method chaining (e.g `builder.doThis(...).doThat(...)`).