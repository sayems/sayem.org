---
date: 2015-08-12
title: "Immutables Library Examples"
template: post
thumbnail: ../thumbnails/writing.png
slug: immutable
categories:
  - Java

tags:
  - Java
---

Some examples demonstrating how to use the [Immutables Library][1] to create immutable classes in Java.

```java

import org.immutables.value.Value;

import java.util.List;
import java.util.Optional;

@Value.Immutable
public interface Book {
    String title();

    Optional<String> excerpt();

    Float price();

    List<String> tags();

}

```



```java

import org.immutables.value.Value;

import java.util.List;

@Value.Immutable
public interface Library {
    String name();

    List<Book> books();

    boolean opened();
}

```


```java

public class AppTest {

    public static void main(final String[] args) {
        Book book1 = ImmutableBook.builder()
                .title("One first book")
                .excerpt("Lorem ipsum dolor sit.")
                .addTags("foo", "bar", "baz")
                .price(12.5F)
                .build();

        Book book2 = ImmutableBook.builder()
                .title("Another book")
                .addTags("xoxo", "trololol")
                .price(20.2F)
                .build();

        Library library = ImmutableLibrary.builder()
                .name("My first library")
                .opened(true)
                .addBooks(book1, book2)
                .build();

        System.out.println(library.toString());
    }
}

```


You may need to configure annotation processing in your [IDE][2]. You can follow this link to configure annotation processing in [IntelliJ][3]

[1]: https://immutables.github.io/
[2]: https://immutables.github.io/apt.html#intellij-idea
[3]: https://www.jetbrains.com/idea/help/configuring-annotation-processing.html
