package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", indexHandler)
	error := http.ListenAndServe(":8080", nil)

	if error != nil {
		fmt.Println(error)
	}
}

func indexHandler(writer http.ResponseWriter, request *http.Request) {
	fmt.Fprintf(writer, `
		<h1>Index handling</h1>
		<h2>Go is fast</h2>
		<p>And also safe</p>
		<p>format %s like this</p>
	`, "is")

	//fmt.Fprintln(writer, "<h1>Index handling</h1>")
	//fmt.Fprintln(writer, "<h2>Go is fast</h2>")
	//fmt.Fprintln(writer, "<p>And also safe</p>")
	//fmt.Fprintf(writer, "<p>format %s like this</p>", "is")
}
