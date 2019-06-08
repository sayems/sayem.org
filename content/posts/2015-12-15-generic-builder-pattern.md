---
date: 2015-12-15
title: "Java Generic Builder Pattern"
template: post
thumbnail: ../thumbnails/writing.png
categories:
  - Java

tags:
  - Java
---

Implementing the Builder pattern in Java without repeating code

```java
public class App {

    public static void main(String[] args) {

        Person value = GenericBuilder.of(Person::new)
                .with(Person::setName, "Syed")
                .with(Person::setAge, 50)
                .build();

        System.out.println(value.getAge());
        System.out.println(value.getName());
    }
}
```


```java
public class GenericBuilder<T> {

    private final Supplier<T> instantiator;

    private List<Consumer<T>> instanceModifiers = new ArrayList<>();

    public GenericBuilder(Supplier<T> instantiator) {
        this.instantiator = instantiator;
    }

    public static <T> GenericBuilder<T> of(Supplier<T> instantiator) {
        return new GenericBuilder<T>(instantiator);
    }

    public <U> GenericBuilder<T> with(BiConsumer<T, U> consumer, U value) {
        Consumer<T> c = instance -> consumer.accept(instance, value);
        instanceModifiers.add(c);
        return this;
    }

    public T build() {
        T value = instantiator.get();
        instanceModifiers.forEach(modifier -> modifier.accept(value));
        instanceModifiers.clear();
        return value;
    }
}
```


```java
public class Person {

    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```
