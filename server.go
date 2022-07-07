package main

import (
	"database/sql"

	_"github.com/lib/pq"

	"fmt"
	"log"
	"net/http"
	"os"
)

type WISHES struct {
	ID string 
	Text string
}

func formGetter(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
			log.Fatalf("Error opening database: %q", err)
	}
	defer db.Close()


}

func formWriter(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
			log.Fatalf("Error opening database: %q", err)
	}
	defer db.Close()

	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS wishes_with_text (
			id SERIAL NOT NULL PRIMARY KEY,
			text TEXT NOT NULL);`)

	if err != nil {
		log.Fatalf("Fatal error has occured: %q", err)
	}

	_, err = db.Exec("INSERT INTO wishes_with_text (text) VALUES ('" + r.FormValue("wishtext") + "');")

	fmt.Println("wish: "+r.FormValue("wishtext"))

	rows, err := db.Query("SELECT * FROM wishes_with_text")
	if err != nil {
		log.Println(err)
	}
	defer rows.Close()

	var u WISHES
	for rows.Next() {
		err := rows.Scan(&u.ID, &u.Text)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("ID: %s, Text: %s\n", u.ID, u.Text)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	http.Redirect(w, r, "/", 301)
}

func main() {
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/", fs)

	http.HandleFunc("/send",formWriter)

	http.HandleFunc("/get",formGetter)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.ListenAndServe(":"+port, nil)
}
