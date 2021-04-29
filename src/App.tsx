import React, { useState, useEffect } from "react";
import { useDispatch /* , useSelector */ } from "react-redux";
import Web3 from "web3";
import "./App.css";
import { getBalance as _getBalance /* , getAccounts */ } from "./redux/actions";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface AccountBalance {
  account: string;
  balance: number;
}

interface State {
  balance?: number;
  account?: string;
  metamaskWallets?: AccountBalance[];
}

function App() {
  const dispatch = useDispatch();

  //test purposes
  //const _balance = useSelector((state: any) => state.balance);

  const [state, setState] = useState<State>({
    balance: 0,
  });
  const [web3Instance, setWeb3Instance] = useState<any>();

  useEffect(() => {
    initW3();
  }, []);

  const initW3 = async () => {
    if (window.ethereum) {
      const Web3Instance = new Web3(window.ethereum);
      await window.ethereum.enable();
      setWeb3Instance(Web3Instance);
    }
  };

  const getBilling = async () => {
    const { account } = state;
    const weiBilling = await web3Instance.eth.getBalance(account);
    const ethBilling = web3Instance.utils.fromWei(weiBilling);
    setState({ ...state, ...{ balance: ethBilling } });
  };

  const getBalance = async (account: string) => {
    dispatch(_getBalance({ account }));
    const weiBalance = await web3Instance.eth.getBalance(account);
    const ethBalance = web3Instance.utils.fromWei(weiBalance, "ether");
    return { account: account, balance: parseInt(ethBalance) };
  };

  const getAccounts = async () => {
    const accounts: string[] = await web3Instance.eth.getAccounts();
    const promises = accounts.map((account: string) => getBalance(account));
    const wallets: AccountBalance[] = await Promise.all(promises);
    setState({ ...state, ...{ metamaskWallets: wallets } });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setState({ ...state, ...{ [name]: value } });
  };

  const { balance, metamaskWallets } = state;

  return (
    <section>
      <div>
        <label htmlFor="account">Cuenta</label>
        <input name="account" id="account" onChange={onChange} />
        <button onClick={getBilling}>Consultar</button>
        Saldo: {balance} ETH
      </div>
      <div>
        <button onClick={getAccounts}>
          Obtener balance de cuentas en Metamask
        </button>{" "}
        {metamaskWallets?.map((mmw) => (
          <div key={mmw.account}>
            {mmw.account}: {mmw.balance} ETH
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
