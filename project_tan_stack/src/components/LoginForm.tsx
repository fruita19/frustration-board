import React from 'react'

interface Props {
  loginInput: string;
  setLoginInput: (val: string) => void;
  handleLogin: () => void;
}

export const LoginForm: React.FC<Props> = ({ loginInput, setLoginInput, handleLogin }) => {
  return (
    <div className="login-screen w-full flex flex-col items-center justify-center">
      <div className="card flex w-auto flex-col">
        <h1>Zaloguj się</h1>
        <input 
          value={loginInput} 
          onChange={(e) => setLoginInput(e.target.value)} 
          placeholder="Twój login..."
        />
        <button onClick={handleLogin} className="flex justify-end">Wejdź</button>
      </div>
    </div>
  )
}