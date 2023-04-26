import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {MetaMaskProvider} from 'metamask-react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import CreateNFTFormPage from './CreateNFTFormPage';
import EditProfile from './EditProfile';
import CreateNFTPage from "./CreateNFTPage";
import UserProfile from "./UserProfile";
import Modal from 'react-modal';
import Modal1 from "./Modals/Modal1";
import ExploreNFTs from "./ExploreNFTs";
import CreatorProfile from "./CreatorProfile";
import Activity from "./Activity";
import Archive from "./Archive";
import CreateNFTCollectionPage from "./CreateNFTCollectionPage";
import MyCollection from "./MyCollection";
import ExploreCollections from "./ExploreCollections";
import NFTDetails from "./NFTDetails";
import CollectionStats from "./CollectionStats";
import C from "./Testing/C";


const router = createBrowserRouter([
    {
        path: "/", element: (<App/>)
    },
    {
        path: "/create-nft", element: <CreateNFTPage/>,
    },
    {
        path: "/create-nft-form", element: <CreateNFTFormPage/>,
    },
    {
        path: "/edit-profile", element: <EditProfile/>,
    },
    {
        path: "/user-profile", element: <UserProfile/>,
    },
    {
        path: "/explore-nfts", element: <ExploreNFTs/>,
    },
    {
        path: "/creator-profile", element: <CreatorProfile/>,
    },
    {
        path: "/activity", element: <Activity/>,
    },
    {
        path: "/archive", element: <Archive/>,
    },
    {
        path: "/create-nft-collection-form", element: <CreateNFTCollectionPage/>,
    },
    {
        path: "/my-collections", element: <MyCollection/>,
    },
    {
        path: "/explore-collections", element: <ExploreCollections/>,
    },
    {
        path: "/nft-details", element: <NFTDetails/>,
    },
    {
        path: "/stats", element: <CollectionStats/>,
    }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.Fragment>
    <MetaMaskProvider>
        <RouterProvider router={router}/>
    </MetaMaskProvider>

</React.Fragment>);
