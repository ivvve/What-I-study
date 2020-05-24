package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	response, _ := http.Get("https://www.washingtonpost.com/sitemaps/index.xml")
	bytes, _ := ioutil.ReadAll(response.Body)
	body := string(bytes)
	response.Body.Close()

	fmt.Println(body)
}
