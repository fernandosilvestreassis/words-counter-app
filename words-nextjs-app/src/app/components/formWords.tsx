"use client"
// components/FormWordsComponent.tsx
import { useState } from 'react';
import axios from 'axios';

const FormWordsComponent: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [displayText, setDisplayText] = useState<string | null>(null);
  const [waiting, setWaiting] = useState<boolean>(false);

  const handleOkClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Evita a reinicialização da página

    setWaiting(true);

    try {
      // Envia a requisição para a API (substitua a URL pela sua API)
      const response = await axios.post('https://gqtqp9la97.execute-api.us-east-1.amazonaws.com/dev/getCountWords', {
        message: inputText,
      });
      console.log(response)
      // Atualiza o displayText com o resultado da API
      setDisplayText(response.data.message);
    } catch (error) {
      // Trate erros de requisição aqui
      console.error('Erro na requisição:', error);
    } finally {
      setWaiting(false);
    }
  };

  const handleCleanClick = () => {
    setInputText('');
    setDisplayText(null);
  };

  return (
    <div>
      <h1> Input Text:</h1>
      <div className="mb-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={handleOkClick}
          disabled={waiting}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          OK
        </button>
        <button
          onClick={handleCleanClick}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Clean
        </button>

      </div>
        {waiting && <p>Waiting...</p>}
        {
            displayText !== null && 
            <div className="border border-gray-300 p-2 w-full">
                <p>Result: </p>    
                <div>
                    {Object.keys(displayText).map((key : any) => (
                        <p key={key}>
                        <strong>{key}:</strong> {displayText[key]}
                        </p>
                    ))}
                </div>
            </div>
        }
      </div>
    
  );
};

export default FormWordsComponent;
