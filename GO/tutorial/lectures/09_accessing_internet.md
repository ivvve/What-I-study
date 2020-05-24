```go
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
    // http.Get을 통해 외부 인터넷에 접속할 수 있다
	response, _ := http.Get("https://www.washingtonpost.com/sitemaps/index.xml")
	bytes, _ := ioutil.ReadAll(response.Body)
	body := string(bytes)
	response.Body.Close()

	fmt.Println(body)
}
```