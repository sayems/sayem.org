---
date: 2015-09-13
title: "Fluent Interface"
template: post
thumbnail: ../thumbnails/writing.png
categories:
  - Java

tags:
  - Java
---


Fluent Interface example using Java generics 

```java
public class Demo {
	@Test
	public void genericTest() {

		Cake<String> cake = new Cake<String>()
			.prepare()
			.addFlour()
			.addSugar()
			.addSecretIngredient("Yogurt")
			.mix()
			.bake();

		Pizza<String> pizza = new Pizza<String>()
			.prepare()
			.addSauce()
			.addCheese()
			.addTopping("Bacon")
			.addSecretIngredient("Arugula")
			.addTopping("Clams")
			.bake();

		cake.eat();
		pizza.eat();
	}
}
```


```java
@SuppressWarnings("unchecked")
@FunctionalInterface
public interface Factory<E extends Factory<E>> {

    E bake();

	default E prepare() {
		System.out.println("preparing the kitchen");
		return (E) this;
	}

	default E eat() {
		String string = new StringBuilder()
			.append("Mmm, this ").append(this.getClass().getSimpleName())
		    .append(" is so tasty!")
			.toString();

		System.out.println(string);
		return (E) this;
	}
}
```


```java
public abstract class Ingredient<E extends Ingredient<E, T>, T> implements Factory<E> {

	@SuppressWarnings("unchecked")
	public E addSecretIngredient(T ingredient) {
		System.out.println("adding some " + ingredient);
		return (E) this;
	}
}
```


```java
public class Cake<T> extends Ingredient<Cake<T>, T> {

	public Cake<T> addSugar() {
		System.out.println("adding sugar");
		return this;
	}

	public Cake<T> addFlour() {
		System.out.println("adding flour");
		return this;
	}

	public Cake<T> mix() {
		System.out.println("mixing");
		return this;
	}

	public Cake<T> bake() {
		System.out.println("baking at 325 degrees");
		return this;
	}
}
```


```java
public class Pizza<T> extends Ingredient<Pizza<T>, T> {

	public Pizza<T> addCheese() {
		System.out.println("adding cheese");
		return this;
	}

	public Pizza<T> addSauce() {
		System.out.println("adding sauce");
		return this;
	}

	public Pizza<T> addTopping(T topping) {
		System.out.println("putting some " + topping + " on top");
		return this;
	}

	public Pizza<T> bake() {
		System.out.println("baking at 450 degrees");
		return this;
	}
}
```
