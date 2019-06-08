---
date: 2016-04-20
title: "Microservice testing"
template: post
thumbnail: ../thumbnails/writing.png
categories:
  - Java
  - Microservices

tags:
  - Java
  - Microservice
---

Microservice are hot buzz words in the development community right now. There are quite a lot of learning materials  of microservices, but there are very few resources on how to test microservices. My company is in the process implementing ‘microservices’, and I've been asked to build a test automation framework to test microservice. 

In this post, I'll demonstrate how to write a basic hello server and hello client to test microservices.

![first-screenshot][1]

1. Create a maven project 
2. Add the following dependency to your pom.xml:

```xml

    <dependencyManagement>

        <dependencies>
            <!-- Logging -->
            <dependency>
                <groupId>org.slf4j</groupId>
                <artifactId>slf4j-api</artifactId>
                <version>${slf4j.version}</version>
            </dependency>
            <dependency>
                <groupId>org.slf4j</groupId>
                <artifactId>slf4j-simple</artifactId>
                <version>${slf4j.version}</version>
            </dependency>
            <dependency>
                <groupId>org.slf4j</groupId>
                <artifactId>slf4j-jdk14</artifactId>
                <version>${slf4j.version}</version>
            </dependency>
            <dependency>
                <groupId>ch.qos.logback</groupId>
                <artifactId>logback-classic</artifactId>
                <version>1.1.2</version>
            </dependency>
            <!-- No commons logging -->
            <dependency>
                <groupId>commons-logging</groupId>
                <artifactId>commons-logging</artifactId>
                <version>${commons-logging.version}</version>
                <scope>provided</scope>
            </dependency>
            <dependency>
                <groupId>org.slf4j</groupId>
                <artifactId>jcl-over-slf4j</artifactId>
                <version>${slf4j.version}</version>
            </dependency>

            <!-- Protobuf -->
            <dependency>
                <groupId>com.google.protobuf</groupId>
                <artifactId>protobuf-java</artifactId>
                <version>${protobuf.version}</version>
            </dependency>

            <!-- GRPC -->
            <dependency>
                <groupId>io.grpc</groupId>
                <artifactId>grpc-core</artifactId>
                <version>${grpc.version}</version>
            </dependency>
            <dependency>
                <groupId>io.grpc</groupId>
                <artifactId>grpc-stub</artifactId>
                <version>${grpc.version}</version>
            </dependency>
            <dependency>
                <groupId>io.grpc</groupId>
                <artifactId>grpc-protobuf</artifactId>
                <version>${grpc.version}</version>
            </dependency>
            <dependency>
                <groupId>io.grpc</groupId>
                <artifactId>grpc-netty</artifactId>
                <version>${grpc.version}</version>
            </dependency>
            <dependency>
                <groupId>io.grpc</groupId>
                <artifactId>grpc-okhttp</artifactId>
                <version>${grpc.version}</version>
            </dependency>

            <dependency>
                <groupId>io.grpc</groupId>
                <artifactId>protoc-gen-grpc-java</artifactId>
                <version>${grpc.version}</version>
            </dependency>

            <!-- Test scope -->
            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>4.8.2</version>
                <scope>test</scope>
            </dependency>
            <dependency>
                <groupId>org.mockito</groupId>
                <artifactId>mockito-all</artifactId>
                <version>1.9.0</version>
                <scope>test</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>


```


Create a hello.proto

```java
syntax = "proto3";

package sayem.hello;

option java_package = "org.sayem.hello";

option java_outer_classname = "HelloModel";

//
// Request / Response
//

message GreetingRequest {
    string name = 1;
}

message GreetingReply {
    string greeting = 2;
}

//
// Service
//

service HelloService {
    rpc GetGreeting (GreetingRequest) returns (GreetingReply) {
    }
}
```



Create a HelloClient Module

```java

public final class HelloClient {

    private final Logger log = LoggerFactory.getLogger(getClass());
    private final ManagedChannel channel;
    private final HelloServiceGrpc.HelloServiceBlockingClient blockingStub;

    /**
     * Construct client connecting to HelloWorld server at {@code host:port}.
     */
    public HelloClient(String host, int port) {
        channel = ManagedChannelBuilder.forAddress(host, port)
                .usePlaintext(true) // - for debug only
                .build();
        blockingStub = HelloServiceGrpc.newBlockingStub(channel);
    }

    public static void main(String[] args) throws InterruptedException {
        HelloClient client = new HelloClient("localhost", 8081);
        try {
      /* Access a service running on the local machine on port 50051 */
            String user = "world";
            if (args.length > 0) {
                user = args[0]; /* Use the arg as the name to greet if provided */
            }
            client.greet(user);

            String user2 = "GRPC client";
            if (args.length > 1) {
                user2 = args[1]; /* Use the arg as the name to greet if provided */
            }
            client.greet(user2);
        } finally {
            client.shutdown();
        }
    }

    public void shutdown() throws InterruptedException {
        channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
    }

    /**
     * Say hello to server.
     */
    public void greet(String name) {
        log.info("Will try to greet {} ...", name);
        HelloModel.GreetingRequest request = HelloModel.GreetingRequest.newBuilder()
                .setName(name)
                .build();
        HelloModel.GreetingReply response;
        try {
            response = blockingStub.getGreeting(request);
        } catch (StatusRuntimeException e) {
            log.warn("RPC failed: {}", e.getStatus());
            return;
        }
        log.info("Greeting: {}", response.getGreeting());
    }
```



Now, create a client module

```java

public final class HelloClient {

    private final Logger log = LoggerFactory.getLogger(getClass());
    private final ManagedChannel channel;
    private final HelloServiceGrpc.HelloServiceBlockingClient blockingStub;

    /**
     * Construct client connecting to HelloWorld server at {@code host:port}.
     */
    public HelloClient(String host, int port) {
        channel = ManagedChannelBuilder.forAddress(host, port)
                .usePlaintext(true) // - for debug only
                .build();
        blockingStub = HelloServiceGrpc.newBlockingStub(channel);
    }

    public static void main(String[] args) throws InterruptedException {
        HelloClient client = new HelloClient("localhost", 8081);
        try {
      /* Access a service running on the local machine on port 50051 */
            String user = "world";
            if (args.length > 0) {
                user = args[0]; /* Use the arg as the name to greet if provided */
            }
            client.greet(user);

            String user2 = "GRPC client";
            if (args.length > 1) {
                user2 = args[1]; /* Use the arg as the name to greet if provided */
            }
            client.greet(user2);
        } finally {
            client.shutdown();
        }
    }

    public void shutdown() throws InterruptedException {
        channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
    }

    /**
     * Say hello to server.
     */
    public void greet(String name) {
        log.info("Will try to greet {} ...", name);
        HelloModel.GreetingRequest request = HelloModel.GreetingRequest.newBuilder()
                .setName(name)
                .build();
        HelloModel.GreetingReply response;
        try {
            response = blockingStub.getGreeting(request);
        } catch (StatusRuntimeException e) {
            log.warn("RPC failed: {}", e.getStatus());
            return;
        }
        log.info("Greeting: {}", response.getGreeting());
    }
}
```

You can see the full source code in [this repository][2]



[1]: ../images/grpc.png
[2]: https://github.com/sayems/grpc.examples