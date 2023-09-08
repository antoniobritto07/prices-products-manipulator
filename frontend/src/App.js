import React, { useState, useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip'
import axios from 'axios';

import Papa from 'papaparse';

import { MdUploadFile } from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import { isInvalidOperation } from './utils/verifyUpdateButton.js';

const App = () => {
  const [data, setData] = useState([]);
  const [validation, setValidation] = useState(false);
  const [loading, setLoading] = useState(false)

  const showToastMessage = useCallback((message, type) => toast(`${message}`, {
    position: toast.POSITION.TOP_RIGHT,
    type: type,
    autoClose: 3000
  }), [])

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const result = await getProductsDataByCsv(results.data)
        setData(result)
      },
    });
  };

  const getProductsDataByCsv = async (produtosCsv) => {
    console.log(produtosCsv);
    let productsToDisplay = [];

    for (const produtoCsv of produtosCsv) {
      const { data } = await axios.get(`http://localhost:3333/product/${produtoCsv.product_code_1}`);

      productsToDisplay.push({
        id: data.id,
        newPrice: produtoCsv.new_price,
        previousPrice: data.sales_price,
        code: produtoCsv.product_code_1,
        name: data.name,
        costPrice: data.cost_price,
      });
    }

    return productsToDisplay;
  }

  const validateChange = (dados) => {
    let message = {};

    if (!dados.code || !dados.newPrice) {
      message.text = "Código ou preço de atualização do produto não informado"
      message.type = 'error'
      return message;
    }

    console.log(dados.costPrice, 'preco de custo');
    console.log(dados.newPrice, 'preco novo');

    // Problema do Financeiro
    if (parseFloat(dados.newPrice) < parseFloat(dados.costPrice)) {
      message.text = "[FINANCEIRO]: Produto não pode ser vendido abaixo do preço de produção"
      message.type = 'error'
      return message;
    }

    // Problema do Marketing
    if (
      parseFloat(dados.newPrice) > parseFloat(dados.previousPrice) * 1.1 ||
      parseFloat(dados.newPrice) < parseFloat(dados.previousPrice) * 0.9
    ) {
      message.text = "[MARKETING]: O reajuste não pode ser maior ou menor do que 10% do preço atual do produto"
      message.type = 'error'
      return message;
    }

    message.text = "Modificação autorizada"
    message.type = 'success'

    return message;
  }

  const updatePrices = async (data) => {
    try {
      if (data === null) {
        showToastMessage('Algum problema aconteceu com a aplicação', 'error')
      }

      for (const eachData of data) {
        await axios.patch(`http://localhost:3333/product/${eachData.code}`,
          { sales_price: eachData.newPrice }
        );
      }
      setLoading(true)
      showToastMessage(`Produtos atualizados com sucesso.`, 'success');
      setTimeout(function () {
        window.location.reload();
      }, 3000)
    }
    catch (error) {
      showToastMessage('Algum problema aconteceu com a aplicação', 'error')
    }
  }
  if (loading) {
    return (
      <div className="container">
        <h1 className="title">Atualizador de preços</h1>
        <div className="carregar-csv-container">
          <FaSpinner size={25} className="loading-icon" />
          <h3>Carregando... Aguarde um pouco</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Atualizador de preços</h1>

      <div className="carregar-csv-container">
        <MdUploadFile size={25} />
        <input
          type="file"
          accept='.csv'
          onChange={handleFileUpload}
        />
        <button
          className="button-actions"
          disabled={data.length === 0}
          onClick={() => setValidation(true)}
        >
          VALIDAR
        </button>
        <Tooltip
          title={isInvalidOperation(data) ? "Todos os Status precisam estar permitidos para conseguir atualizar" : null}
          placement="right-start"
        >
          <button
            className="button-actions"
            disabled={!validation || isInvalidOperation(data)}
            onClick={() => updatePrices(data)}
          >
            ATUALIZAR
          </button>
        </Tooltip>

      </div>

      <div>
        {data.length !== 0 ? (
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Preço Antigo</th>
                <th>Preço Novo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((eachData, index) => (
                <tr key={index}>
                  <td>{eachData.code ?? '-'}</td>
                  <td>{eachData.name ?? '-'}</td>
                  <td>{eachData.previousPrice ?? '-'}</td>
                  <td>{eachData.newPrice ?? '-'}</td>
                  <td> {validation && (
                    <Tooltip title={validateChange(eachData).text} placement="right-start">
                      <div
                        style={{
                          backgroundColor:
                            validateChange(eachData).type === 'success' ? 'green' : 'red',
                        }}
                        className="information-label-update"
                      >
                        <label>
                          {validateChange(eachData).type === 'success'
                            ? 'Permitido'
                            : 'Não Permitido'}
                        </label>
                      </div>
                    </Tooltip>
                  )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;