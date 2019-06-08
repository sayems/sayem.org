---
date: 2015-11-01
title: "Factory method pattern"
template: post
thumbnail: ../thumbnails/java.png
slug: factory-method-pattern
categories:
  - Java

tags:
  - Java
---

Factory method pattern example

```java
public interface Animal {
    <T> T create(Class<T> responseClass);
}
```


```java
public class AnimalFactory implements Animal {

    @Override
    public <T> T create(Class<T> responseClass) {
        try {
            return responseClass.newInstance();
        } catch (InstantiationException | IllegalAccessException e) {
            throw new IllegalArgumentException(e);
        }
    }
}

```


```java
public class Cat {

    public Dog catSound() {
        System.out.println("Meow");
        return new Dog();
    }
}
```


```java
public class Dog {

    public void dogSound() {
        System.out.println("Wof");
    }

}
```


```java
public class App {

    public static void main(String[] args) {

        Animal animal = new AnimalFactory();
        Cat cat = animal.create(Cat.class);
        cat.catSound();
        
        Dog dog = animal.create(Dog.class);
        dog.dogSound();
    }
}
```