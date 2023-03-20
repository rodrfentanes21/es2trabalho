import React, { useState } from "react";
import Link from "next/link";

type FormData = {
  name: string;
  endereco: string;
  telefone: string;
  id: string,
};

export async function getServerSideProps() {
  async function fetchData() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = "";

    var requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch("http://localhost:8080/contatos", requestOptions).then(
      (response) => response.text()
    );
  }
  const data = await fetchData();

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default function update(props: { data: any }) {
  const data = JSON.parse(props.data);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    endereco: "",
    telefone: "",
    id: "",
  });
  const [submitState, setSubmitState] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    console.log(formData.name);
    console.log(formData.endereco);
    console.log(formData.telefone);
    console.log(formData.id);

    var raw = JSON.stringify({
      name: formData.name,
      telefone: formData.endereco,
      endereco: formData.telefone,
    });

    var requestOptions: RequestInit = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:8080/contatos/${formData.id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    window.location.reload();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="w-full lg:w-screen flex justify-center items-start">
      <Link
        href="/"
        className="w-20 bg-blue-400 hover:bg-sky-700 rounded-full text-white text-xl text-center absolute top-2 left-2"
      >
        Voltar
      </Link>
      <section className=" flex flex-col justify-center items-center gap-2 w-full lg:w-screen">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-start items-center gap-2 w-1/2 aspect-[2/1] py-10 mt-10 border rounded-xl self-center"
        >
          <h1 className="text-2xl">Atualizar</h1>
          <input
            type="number"
            name="id"
            onChange={handleChange}
            value={formData.id}
            placeholder="id"
            className="border text-center w-96 rounded-full"
            required
          />
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="nome"
            className="border text-center w-96 rounded-full"
            required
          />

          <input
            type="text"
            name="endereco"
            onChange={handleChange}
            value={formData.endereco}
            placeholder="endereço"
            className="border text-center w-96 rounded-full"
            required
          />

          <input
            type="text"
            name="telefone"
            onChange={handleChange}
            value={formData.telefone}
            placeholder="telefone"
            className="border text-center w-96 rounded-full"
            required
          />

          <button
            type="submit"
            className="w-20 bg-blue-400 hover:bg-sky-700 rounded-full text-white text-xl text-center"
          >
            Submit
          </button>
          <p>ATENÇÃO: É necessario recarregar a página para ver as mudanças visualmente pela interface</p>
        </form>
        <div className="">
          <h2>Lista de contatos: </h2>
          {data.map((user: any, index: number) => (
            <ul key={index}>
              <li>id: {user.id}</li>
              <li>nome: {user.name}</li>
              <li>endereco: {user.endereco}</li>
              <li>telefone: {user.telefone}</li>
              <hr />
            </ul>
          ))}
        </div>
      </section>
    </div>
  );
}
