package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"regexp"
)

type Page struct {
	Title string
}

func renderTemplate(w http.ResponseWriter, r *http.Request) {
	var validPath = regexp.MustCompile("^/$")
	m := validPath.FindStringSubmatch(r.URL.Path)
	if m == nil {
		http.NotFound(w, r)
		return
	}

	t, err := template.ParseFiles("index.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	p := &Page{Title: "Imersão Full Cycle - Desafio Docker e Golang"}
	err = t.ExecuteTemplate(w, "index.html", p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func main() {
	http.HandleFunc("/", renderTemplate)
	fmt.Println("Servidor web rodando na porta 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
