import React from "react";
import WalletAuthenticationPage from "./WalletAuthenticationPage";
import LandingPage from "./LandingPage";
import {useMetaMask} from "metamask-react";
import EditProfile from "./EditProfile";
import C from "./Testing/C";
import D from "./Testing/D";
import E from "./Testing/E";


function App() {
    const {status, connect, account} = useMetaMask();
    if (status === "initializing") {
        return <div>Synchronisation with MetaMask ongoing...</div>;
    } else if (status === "unavailable") {
        return <div>MetaMask not available :\</div>;
    } else if (status === "notConnected") {
        return <WalletAuthenticationPage connect={connect}/>;
    } else if (status === "connecting") {
        return <div>Connecting...</div>;
    } else if (status === "connected") {
        return <div>
            <LandingPage/>
        </div>;
    } else {
        return <div>Unknown status Hello</div>;
    }
}

export default App;