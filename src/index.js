import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {MetaMaskProvider} from 'metamask-react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";


const router = createBrowserRouter([{
    path: "/", element: (<App/>)
},
    {
        path: "/dashboard", element: <>hello world</>,
    }
]);

// {
//   path: "/mint-tokens",
//   element: <MintTokens />,
// },
// {
//   path: "/my-nfts",
//   element: <MyNFTs />,
// },
// ]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.Fragment>
    <MetaMaskProvider>
        <RouterProvider router={router}/>
    </MetaMaskProvider>

</React.Fragment>);
