"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import mammoth from "mammoth";

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [terms, setTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState([]);

  useEffect(() => {
    // Carga el documento Word y conviértelo a HTML
    axios
      .get("/glosario-prueba2.docx", { responseType: "arraybuffer" })
      .then((response) => {
        console.log("Archivo Word cargado correctamente"); // Agrega esta línea
        mammoth
          .extractRawText({ arrayBuffer: response.data })
          .then((result) => {
            const html = result.value;
            // Parsea el HTML para obtener los términos
            const parsedTerms = html.split("\n");
            setTerms(parsedTerms);
          });
      })
      .catch((error) => {
        console.error("Error al cargar el archivo Word", error);
      });
  }, []);

  useEffect(() => {
    if (Array.isArray(terms)) {
      // Verifica que 'terms' sea un arreglo
      // Filtra los términos en tiempo real en función de la búsqueda
      const filtered = terms.filter((term) =>
        term.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTerms(filtered);
    } else {
      setFilteredTerms([]); // Establece un arreglo vacío si 'terms' no es un arreglo válido
    }
  }, [searchTerm, terms]);

  return (
    <section
      className="card bg-base-200 flex flex-col mt-[2rem] drop-shadow-md
    hover:drop-shadow-xl mx-[10%] ml-20 mr-3 md:mx-[25%]"
    >
      <div className="m-auto font-medium text-4xl justify-center text-center mt-[2rem] md:text-5xl">
        Glosario
      </div>
      <div className="flex justify-center">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">¿Qué quieres averiguar hoy?</span>
            <span className="badge badge-accent">φ(*￣0￣)</span>
          </label>
          <input
            className="input input-bordered input-primary w-full max-w-xs border-2 input-sm"
            type="text"
            placeholder="Buscador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center">
        {searchTerm === "" ? (
          <label className="label label-text">{"✍️(◔◡◔)"}</label>
        ) : (
          <label className="label label-text">
            Coincidencias encontradas: {filteredTerms.length}
          </label>
        )}
      </div>
      <div class="divider mx-20"></div>
      <ul role="list" className="my-10 space-y-3 md:mx-20 mx-10">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((term, index) => (
            <li className="" key={index}>
              {term.split(" ").map((word, i) => (
                <span
                  key={i}
                  className={
                    i === 0 ? "font-black text-2xl hover:bg-primary" : " "
                  }
                >
                  {word}
                  {i < term.split(" ").length - 1 ? " " : ""}
                </span>
              ))}
            </li>
          ))
        ) : searchTerm !== "" ? (
          <div className="flex justify-center">
            <p>No se encontraron resultados</p>
          </div>
        ) : null}
      </ul>
    </section>
  );
}
