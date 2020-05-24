```go
package main

import (
	"fmt"
	"net/http"
)

// *는 메모리 주소 아님
func indexHandler(writer http.ResponseWriter, request *http.Request)  {
	fmt.Fprintf(writer, "Whoa, Go is neat!")
}

func aboutHandler(writer http.ResponseWriter, request *http.Request)  {
	fmt.Fprintf(writer, "About me??")
}

func main() {
	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/about", aboutHandler)
	err := http.ListenAndServe(":8080", nil)

	if err != nil {
		fmt.Println(err)
	}
}
```