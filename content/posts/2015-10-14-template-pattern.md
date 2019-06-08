---
date: 2015-10-14
title: "Template pattern"
template: post
thumbnail: ../thumbnails/writing.png
categories:
  - Java

tags:
  - Java
---

Template pattern example 

```java
public interface Spread {}
```


```java
public abstract class SandwichMaker<S extends Spread> {
    public void make(S spread) {
        toastBread();
        addSpread(spread);
        enjoy();
    }

    protected void toastBread() {
        System.out.println("...toasting bread");
    }

    protected abstract void addSpread(S spread);

    protected void enjoy() {
        System.out.println("this is yummy!");
    }
}
```


```java
public class CheeseSandwichMaker extends SandwichMaker<Cheese> {
    @Override
    protected void addSpread(Cheese cheese) {
        System.out.println("... adding " + cheese.name + " cheese from " + cheese.origin);
    }
}
```


```java
public class Cheese implements Spread {
    public final String name;
    public final String origin;

    public Cheese(String name, String origin) {
        this.name = name;
        this.origin = origin;
    }
}
```


```java
public class Demo {

    public static void main(String[] argv) {
        SandwichMaker<Cheese> sandwich = new CheeseSandwichMaker();
        sandwich.make(new Cheese("Camembert", "Normandy, France"));
        sandwich.make(new Cheese("Cheddar", "Somerset, England"));
    }
}
```



