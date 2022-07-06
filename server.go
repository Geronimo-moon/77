package main

import (
	"fmt"
	"net/http"
	"os"
)

func formWriter(w http.ResponseWriter, r *http.Request) {
	fmt.Println("wishtext", r.FormValue("wishtext"))
}

func main() {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/", fs)

	http.HandleFunc("/send",formWriter)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.ListenAndServe(":"+port, nil)
}
