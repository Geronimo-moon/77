package main

import (
	"net/http"
	"os"
	"math/rand"
	"time"
)

func redirectHandler(w http.ResponseWriter, r *http.Request) {
	redirects := []string{"/react","/vanilla"}

	rand.Seed(time.Now().UnixNano())

	http.Redirect(w, r, redirects[rand.Intn(len(redirects))], 301)
}

func main() {
	imgFs := http.FileServer(http.Dir("static/img"))
	http.Handle("/img", imgFs)

	vanillaFs := http.FileServer(http.Dir("static/vanilla"))
	http.Handle("/vanilla", vanillaFs)

	reactFs := http.FileServer(http.Dir("static/react"))
	http.Handle("/react", reactFs)

	http.HandleFunc("/", redirectHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.ListenAndServe(":"+port, nil)
}
