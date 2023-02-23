import React, { useState, useEffect } from "react";
import axios from "axios";
const Calculation = () => {
  const [data, setdata] = useState([]);
  const [montanAchat, setMontanAchat] = useState(0);
  const [fondPro, setfondPro] = useState(0);
  const [duree, setDuree] = useState(0);
  const dataC = {
    montantDachat: Number(montanAchat),
    fondPropre: Number(fondPro),
    dureeDuCr: Number(duree),
  };

  const changeMont = (e) => {
    setMontanAchat(e.target.value);
  };
  const changeFondPro = (e) => {
    setfondPro(e.target.value);
  };
  const changeDuree = (e) => {
    setDuree(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/", dataC)
      .then((response) => {
        setdata(response.data);
        console.log(dataC);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("shit this is the saved data", data.empNet);
  };
  return (
    <div className="w-full max-w-6xl mx-auto px-4 m-9">
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Montant d'achat
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="number"
              placeholder="montant d'achat"
              onChange={changeMont}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              les fonds propres
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              placeholder="les fonds propres"
              onChange={changeFondPro}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Durée du crédit ans
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              placeholder=" la durée du crédit"
              onChange={changeDuree}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className=" ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              le montant à emprunter
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="number"
              placeholder="le montant à emprunter"
              value={data.empNet || ''}
              readOnly
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              la mensualité
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              placeholder="la mensualité"
              value={data.monsualite || ""}
              readOnly
            />
          </div>
        </div>
      </form>
     
      <div className="grid grid-cols-4 ">
        <div className="...">
          {" "}
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className=" py-3">
                  Sold Debut
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white   dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                {data.soldDeb?.map((m, i) => (
                  <tr key={i} className="bg-white   dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    {m}
                  </tr>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="...">
          {" "}
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className=" py-3">
                  Interet
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white   dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                {data.int?.map((m, i) => (
                  <tr key={i} className="bg-white   dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    {m}
                  </tr>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="...">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className=" py-3">
                  Capitale Remboursé
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white   dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                {data.capitRemb?.map((m, i) => (
                  <tr key={i}  className="bg-white   dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    {m}
                  </tr>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="..."> <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className=" py-3">
                Sold Fin
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white content-center dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                {data.soldFinn?.map((m, i) => (
                  <tr key={i} className="bg-white text-center dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    {m}
                  </tr>
                ))}
              </tr>
            </tbody>
          </table></div>
      </div>
    </div>
  );
};

export default Calculation;
