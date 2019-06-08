---
date: 2016-09-10
title: "Selenium Page Object in Golang"
template: post
thumbnail: ../thumbnails/selenium.png
categories:
  - Golang
  - Selenium

tags:
  - Golang
  - Selenium
  - WebDriver
---

Recently I started learning Golang and I want to share with you how I taught myself to program in Golang and created a selenium page object project in Golang. The first thing I did to teach myself to program in Go was to take the [Tour of Go][1]

The tour is a great interactive tutorial that helps you get your feet wet with the language.  It works right inside your web browser, so you do not have to install anything to get going right away with learning go.

Next, I started reading "Go Programming Language by Alan Donovan". This really helped me learn how to write code in go. The book teaches you Go in an incremental fashion using simple exercises that build upon each other. It is one of the best ways to learn Go right now.

Once you have some idea on how to program in Go, its time to start writing small a project like Selenium test. 

When writing selenium tests, a common pattern is to use Page Objects. Page Objects help you write cleaner tests by encapsulating information about the elements on your application page. A Page Object can be reused across multiple tests, and if the template of your application changes, you only need to update the Page Object.

Selenium doesn't have any official language binding for Golang, so we will use one of the selenium third-party library for golang.

To get the third-party selenium library, open the terminal and run the following command:
```bash
$ go get github.com/tebeka/selenium
```

Next, install any WebDrivers you plan to use. For Mac OS X (using Homebrew):
```bash
$ brew install phantomjs
$ brew install chromedriver
$ brew install selenium-server-standalone
```


For Arch Linux (using Pacman/Yaourt):
```bash
$ yaourt -S selenium-server-standalone
$ yaourt -S chromedriver
```


Clone the git repo:

```bash
$ go get github.com/sayems/golang.webdriver
```



Project structure
```
golang.webdriver/
      +- pages/
            +- page.go
            +- home_page.go
            +- login_page.go
            +- men_page.go
            +- women_page.go
      +- tests/ 
            +- base_test.go
            +- register_test.go
            +- login_test.go
            +- other_test.go
  +- .gitignore
  +- Dockerfile
  +- LICENSE
  +- README.md
  +- docker-compose.yml
  +- pom.xml
```


home_page.go

```go
package pages

type HomePage struct {
	Page Page
}

var account = "#header ..."
var myAccount = "#header-account ..."

func (s *HomePage) GoToAccountPage() *AccountPage {
	s.Page.FindByCss(account).Click()
	s.Page.FindByCss(myAccount).Click()
	return &AccountPage{Page:s.Page}
}

func (s *HomePage) GoToMenPage() *MenPage {
	return &MenPage{Page:s.Page}
}

func (s *HomePage) GoToWomenPage() *WomenPage {
	return &WomenPage{Page:s.Page}
}

func (s *HomePage) GoToAccessoriesPage() *AccessoriesPage {
	return &AccessoriesPage{Page:s.Page}
}

func (s *HomePage) GoToSalePage() *SalePage {
	return &SalePage{Page:s.Page}
}
```


home_test.go

```go
package main

import (
	"testing"
	"github.com/sayems/golang.webdriver/selenium/pages"
)

func TestSelenium(t *testing.T) {

	login := pages.HomePage{Page:page}
	login.GoToAccountPage().
		CreateAnAccount().
		Register()

}
```

You can see the full source code in this [repository][2]

[1]: https://tour.golang.org
[2]: https://github.com/sayems/golang.webdriver