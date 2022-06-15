import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const shortAddress = (addr: String) => {
  const front_part = addr.slice(0, 6)
  const back_part = addr.slice(-4)
  const short_address = front_part + "..." + back_part
  return short_address
}

const connectWallet = async () => {

  const { ethereum }: any = window;
  const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
  if (metamaskIsInstalled) {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const networkId = await ethereum.request({
        method: "net_version",
      });
      if (networkId !== 3) {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            { chainId: '0x3' }
          ]
        });
      }
      const account = accounts[0]
      return shortAddress(account)
    } catch (err) {
      toast.error('Something went wrong', { theme: 'dark' });
      return null;
    }
  } else {
    toast.error("Install Metamask!", { theme: 'dark' });
    return null;

  }
}

export {
  connectWallet
}