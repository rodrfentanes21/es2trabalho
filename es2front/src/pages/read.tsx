import React, { useEffect } from "react";
import Link from "next/link";

export async function getServerSideProps() {
  async function fetchData() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = "";
    
    var requestOptions : RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      mode: "no-cors"
    };
    
    return fetch("http://localhost:8080/contatos", requestOptions)
      .then(response => response.text())
  }
  const data = await fetchData();

  return {
    props: {data}, // will be passed to the page component as props
  }
}

export default function read(props : {data: any}) {
  const data = JSON.parse(props.data)

  const deleteContato = async (userId : any) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    let requestOptions : RequestInit = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    const response = await fetch(`http://localhost:8080/contatos/${userId}`, requestOptions)
    
    window.location.reload();
  }

  return (
    <div className="w-full lg:w-screen h-screen flex justify-center items-start">
      <Link
        href="/"
        className="w-20 bg-blue-400 hover:bg-sky-700 rounded-full text-white text-xl text-center absolute top-2 left-2"
      >
        Voltar
      </Link>
      <section className=" flex flex-col justify-center items-center gap-2 w-full lg:w-screen h-screen">
        <div className="">
          {data.map((user:any, index:number) => (
          <div key={index}>
            <p>usuario {user.id}</p>
            <li>nome: {user.name}</li>
            <li>endereco: {user.endereco}</li>
            <li>telefone: {user.telefone}</li>
            <button onClick={() => deleteContato(user.id)} className="w-32 bg-blue-400 hover:bg-sky-700 rounded-full text-white text-xl text-center">Deletar Usuário</button>
          </div>))}
        </div>
      </section>
    </div>
  );
}
