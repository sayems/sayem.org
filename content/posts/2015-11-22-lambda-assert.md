---
date: 2015-11-22
title: "Java 8 Lambda assertion"
template: post
thumbnail: ../thumbnails/java.png
categories:
  - Java

tags:
  - Java
---

In this short post I will demonstrate a simple example how one can utilize the power of Java 8 and lambda expressions to test.

```java
public class App {

    @Test
    public void successfulTestWithMethodReferenceSyntax() {
        Text text = new Text();
        text.verify("Expected value", AssertUtil::assertEquals);
    }

    @Test
    public void failTestWithMethodReferenceSyntax() {
        Text text = new Text();
        text.verify("Unexpected value", AssertUtil::assertNotEquals);
    }

    @Test
    public void successfulTestWithLambdaSyntax() {
        Text text = new Text();
        text.verify("Expected value", (actual, expected) ->
                AssertUtil.assertEquals(actual, expected));
    }

    @Test
    public void failTestWithLambdaSyntax() {
        Text text = new Text();
        text.verify("Unexpected value", (actual, expected) ->
                AssertUtil.assertNotEquals(actual, expected));
    }
}
```

```java
public class Text {

    public void verify(String expected,
                       BiConsumer<String, String> function){
         function.accept(expected, "Expected value");
    }
}
```


```java
public class AssertUtil {

    public static void assertEquals(String actual, String expected) {
        org.testng.Assert.assertEquals(actual, expected);
    }

    public static void assertNotEquals(String actual, String expected) {
        org.testng.Assert.assertNotEquals(actual, expected);
    }
}
```
