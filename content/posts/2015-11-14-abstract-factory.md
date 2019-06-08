---
date: 2015-11-14
title: "Abstract Factory pattern"
template: post
thumbnail: ../thumbnails/writing.png
categories:
  - Java

tags:
  - Java
---

Abstract Factory pattern example

```java
public interface Factory<T extends Color, K extends Animal<T>> {
    public K create();
}
```


```java
public interface Color {
    int getColor();
}
```


```java
public abstract class Animal<T extends Color> {

    T color;

    Animal(T col) {
        color = col;
    }

    public T getColor() {
        return color;
    }
}
```


```java
public class CatFactory<T extends Color> implements Factory<T, Cat<T>> {

    private T color;

    public CatFactory(T color) {
        this.color = color;
    }

    @Override
    public Cat<T> create() {
        return new Cat<T>(color);
    }

    public T getColor() {
        return color;
    }

}
```


```java
public class Blue implements Color {
    public int getColor() {
        return 1;
    }
    public void iAmBlue() {
        System.out.println("I am blue.");
    }
}
```


```java
public class Red implements Color {
    public int getColor() {
        return 2;
    }

    public void iAmRed() {
        System.out.println("I am red.");
    }
}
```


```java
public class Dog<T extends Color> extends Animal<T> {
    public Dog(T col) {
        super(col);
    }
    public void woof() {
        System.out.println("Woof");
    }
}
```


```java
public class Cat<T extends Color> extends Animal<T> {
    public Cat(T col) {
        super(col);
    }
    public void meow() {
        System.out.println("Meow");
    }
}
```


```java
public class Demo {

    public static void main(String[] args) {
        CatFactory<Red> blueCatsFactory = new CatFactory<>(new Red());
        blueCatsFactory.create().meow();
        blueCatsFactory.create().getColor().iAmRed();
        blueCatsFactory.create().meow();

    }
}
```
