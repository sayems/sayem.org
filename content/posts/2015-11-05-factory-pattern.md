---
date: 2015-11-05
title: "Factory pattern"
template: post
thumbnail: ../thumbnails/java.png
slug: factory-pattern
categories:
  - Java

tags:
  - Java
---

Factory method pattern example using Java 8 Lambda 

```java
@FunctionalInterface
public interface Animal {
    String sound();
}
```


```java
public enum AnimalFarm {
    CAT(Cat::new),
    DOG(Dog::new);

    public final Animal factory;
    AnimalFarm(Supplier<Animal> factory) {
        this.factory = requireNonNull(factory).get();
    }
}
```


```java
public class Cat implements Animal{

    @Override
    public String sound() {
        return ("Meow! Meow!");
    }
}
```


```java
public class Dog implements Animal{

    @Override
    public String sound() {
        return ("Woof woof!");
    }
}
```


```java
public class App {

    public static void main(String[] args) {

        Animal dog = AnimalFarm.CAT.factory;
        System.out.println(dog.sound());

        Animal cat = AnimalFarm.DOG.factory;
        System.out.println(cat.sound());

    }
}
```


