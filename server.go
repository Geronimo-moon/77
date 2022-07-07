package main

import (
	"database/sql"

	_"github.com/lib/pq"

	"fmt"
	"log"
	"net/http"
	"os"
)

func formWriter(w http.ResponseWriter, r *http.Request) {
	fmt.Println("wishtext", r.FormValue("wishtext"))
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
			log.Fatalf("Error opening database: %q", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatal("PingError: ", err)
	}else{
		fmt.Println("Successed to connect %q", os.Getenv("DATABASE_URL"))
	}

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
