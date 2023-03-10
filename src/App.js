// import { useMetaMask } from "metamask-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Home</div>,
    },

    // {
    //   path: "/mint-tokens",
    //   element: <MintTokens />,
    // },
    // {
    //   path: "/my-nfts",
    //   element: <MyNFTs />,
    // },
]);

function App() {
    // const { status, connect, account, chainId, ethereum } = useMetaMask();

    // if (status === "initializing") {
    //     return <div>Synchronisation with MetaMask ongoing...</div>;
    // } else if (status === "unavailable") {
    //     return <div>MetaMask not available :\</div>;
    // } else if (status === "notConnected") {
    //     return <button onClick={connect}>Connect to MetaMask</button>;
    // } else if (status === "connecting") {
    //     return <div>Connecting...</div>;
    // } else if (status === "connected") {
    //     return <div><div>
    //         Connected account {account} on chain ID {chainId}
    //         <RouterProvider router={router} />
    //     </div></div>;
    // }

    return <RouterProvider router={router} />;
}

export default App;