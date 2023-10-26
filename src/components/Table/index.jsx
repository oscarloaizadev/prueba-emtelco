"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import DataTable from "react-data-table-component-with-filter";

export default function Table() {
  // Creamos los "Hooks" necesarios para poder manipular a futuro el estado de los datos.
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Estado para almacenar los datos filtrados
  const [searchText, setSearchText] = useState(""); // Estado para almacenar el texto de búsqueda
  const [excelFileName, setExcelFileName] = useState(""); // Nuevo estado para almacenar el nombre del archivo Excel

  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          name: key,
          selector: (row) => row[key],
          sortable: true,
          filterable: true,
        }))
      : [];

  /*
  Función propia para poder manipular la llegada el archivo de excel.
  Esta función toma como argumentos el archivo de excel cuyo objeto será "e".
   */
  const handleFileUpload = (e) => {
    const fileName = e.target.files[0].name;
    // Creamos una instancia del archivo "FileReader()" para de tal forma poder acceder a todos los métodos de esta clase.
    const reader = new FileReader();
    /*
    "readAsBianryString" nos permitirá utilizar nuestra instancia "reader" de la clase "FileReader()" para de tal forma leer el contenido del archivo.
    "e.target.files[0]" es el objeto que va a almacenar la lista de los archivos que hemos leído.
    */
    reader.readAsBinaryString(e.target.files[0]);

    // Esta callback function será ejecutada únicamente si el objeto "e" ha sido leído correctamente.
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
      setFilteredData(parsedData);
      setExcelFileName(fileName);
    };
  };

  const handleFilter = (e) => {
    console.log(data);
    const searchText = e.target.value.toLowerCase();
    setSearchText(searchText);

    if (searchText === "") {
      // Si no hay filtro, mostramos los datos originales
      setFilteredData(data);
    } else {
      const filteredData = data.filter((row) => {
        return Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(searchText)
        );
      });
      setFilteredData(filteredData);
    }
  };

  return (
    <section
      className="card bg-base-200 flex flex-col mt-[4rem] drop-shadow-md
    hover:drop-shadow-xl mx-[10%] ml-20 mr-3 md:mx-[25%]"
    >
      <div className="mt-4 mx-20">
        <div className="m-auto font-medium text-4xl justify-center text-center md:text-5xl">
          Buscador de duplas
        </div>
        <div className="mb-4 justify-center text-center">
          <span className="label-text">
            Buscar info en tus tablas de{" "}
            <span className="badge badge-accent font-bold">excel</span> nunca
            fue más fácil.
          </span>
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-4 flex justify-between">
            <input
              class="file-input file-input-bordered file-input-accent file-input-sm w-full max-w-xs"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              placeholder="a"
            />
            <input
              className="input input-bordered input-primary w-full max-w-xs border-2 input-sm"
              type="text"
              placeholder="Buscador..."
              value={searchText}
              onChange={handleFilter}
            />
          </div>
        </div>
      </div>

      <div>
        <DataTable
          title={excelFileName || "Aquí aparecerá tu documento."}
          columns={columns}
          data={filteredData}
          pagination
          paginationPerPage={10}
          dense={true}
          responsive={true}
        />
      </div>
    </section>
  );
}
