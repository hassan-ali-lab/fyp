import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, {useState} from "react";
// import {FileUploader} from "react-drag-drop-files";
// import Card from "./components/Card";
// import axios from "axios";
// import Web3Modal from "web3modal";
import {useFilePicker} from "use-file-picker";
import {useMetaMask} from "metamask-react";

const profilePic = process.env.PUBLIC_URL + '/edit-profile/profile.png';
const coverPic = process.env.PUBLIC_URL + '/edit-profile/cover.png';

const Container = styled.form`
  width: 100%;
  height: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  //align-items: center;

  .file_uploader {
    width: 50%;
    height: 1000px !important;
  }
`

const Column = styled.div`
  height: 100%;
  //width: 70%;
  //background-color: #5e2020;
  display: flex;

  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 50px 20px;

  .row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 10px 0;
  }


  p {
    margin: 5px 0;
  }

  .btn-strip {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    font-weight: bold;

    .input {
      width: 100%;
      height: 30px;
      margin: 20px;


      //padding: 0 10px;
    }
  }

  .btn-strip-col {
    display: flex;
    flex-direction: row;
    width: 100%;
    //padding: 5px ;
    .col > .btn-strip {
      padding: 10px;

    }

  }
`
// const Dropper = styled.div`
//   height: 300px;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 50px 0;
//
//   label {
//     width: 100%;
//     height: 100%;
//     border-radius: 20px;
//
//
//   }
// `

const CoverImage = styled.img`
  width: 150px;
  height: 100px;
  border-radius: 20px;
  margin: 10px;
`

const ButtonCard = styled.div`
  //background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 100px;
  border-radius: 20px;
  margin: 10px;
`
const RoundImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 200px;
  margin: 0 20px;
  //border: 1px solid #000;
`

const Button1 = styled.button`
  background-color: #FE3796;
  border: 1px solid #FE3796;
  border-radius: 100px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  margin: 0;
  outline: none;
  padding: 13px 50px;
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: box-shadow .2s, -ms-transform .1s, -webkit-transform .1s, transform .1s;
  user-select: none;
  -webkit-user-select: none;
  width: auto;

  :active {
    background-color: transparent;
    color: #ab698a;
    border-color: #9f6985;
    transform: scale(.96);
  }

  :disabled {
    border-color: #DDDDDD;
    color: #DDDDDD;
    cursor: not-allowed;
    opacity: 1;
  }
`
const Button2 = styled.button`
  background-color: transparent;
  border: 1px solid #FE3796;
  border-radius: 100px;
  box-sizing: border-box;
  color: #FE3796;
  cursor: pointer;
  display: inline-block;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  margin: 0;
  outline: none;
  padding: 13px 50px;
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: box-shadow .2s, -ms-transform .1s, -webkit-transform .1s, transform .1s;
  user-select: none;
  -webkit-user-select: none;
  width: auto;

  :active {
    background-color: transparent;
    color: #ab698a;
    border-color: #9f6985;
    transform: scale(.96);
  }

  :disabled {
    border-color: #DDDDDD;
    color: #DDDDDD;
    cursor: not-allowed;
    opacity: 1;
  }
`

// pageTitle: string
// pageDescription: string

function EditProfile(props) {
    const {status} = useMetaMask();
    if (status === "notConnected") {
        window.location.href = '/authentication';

    }
    const [openFileSelector, {filesContent}] = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: false,
      
    });

    const [profile, setProfile] = useState(profilePic)
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [cover, setCover] = useState(coverPic)
    const [customURL, setCustomURL] = useState("")
    const [bio, setBio] = useState("")
    const [email, setEmail] = useState("")

    const [facebook, setFacebook] = useState("")
    const [twitter, setTwitter] = useState("")

    const handleForm = (e) => {
        e.preventDefault();
        console.log("form submitted")
        // users[props.account].profilePic = profile
        // users[props.account].coverPic = cover
        // users[props.account].name = name
        // users[props.account].username = username
        // users[props.account].customURL = customURL
        // users[props.account].bio = bio
        // users[props.account].email = email
        // users[props.account].facebook = facebook
        // users[props.account].twitter = twitter
        // props.setUser({
        //     profile,
        //     cover,
        //     name,
        //     username,
        //     customURL,
        //     bio,
        //     email,
        //     facebook,
        //     twitter,
        //     account: props.account
        // })
        // props.setLogin(true)
        // localStorage.setItem("login", JSON.stringify(true))
        // localStorage.setItem("user", JSON.stringify({
            // profile,
            // cover,
            // name,
            // username,
            // customURL,
            // bio,
            // email,
            // facebook,
            // twitter,
            // account: props.account
        // }))
        // console.log(users)
        // window.location.href = "/"
    }

    return (<div>
        <Header pageTitle={"Edit Profile"} linkTree={"edit profile"}/>
        <Container onSubmit={handleForm}>
            <Column>
                <div className={'row'}>
                    <RoundImage src={profile} onClick={() => {
                        openFileSelector();
                        setProfile(filesContent[0].content)
                    }}/>
                    <div>
                        <p><b>Profile Photo</b></p>
                        <p>We recommend an image <br/> of at least 400x400 <br/>Gifs work too
                        </p>
                        <Button1>Upload</Button1>
                    </div>

                </div>
            </Column>
            <Column>
                <p><b>Choose your cover image</b></p>

                <div className={'row'}>
                    <ButtonCard>
                        <Button2 onClick={() => {
                            openFileSelector();
                            setCover(filesContent[0].content)
                        }}>Upload</Button2>
                    </ButtonCard>
                    <CoverImage src={cover}/>
                    <CoverImage src={coverPic}/>
                </div>
                <div className={'btn-strip'}>
                    <label>Display Name* <br/>
                        <input className={'input'} type="text" name="title" placeholder={'e.g: Mark Basa '}
                               required
                               value={name} onChange={e => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div className={'btn-strip'}>
                    <label>Username* <br/>
                        <input className={'input'} type="text" name="title" placeholder={'e.g: @markbasa '}
                               required
                               value={username} onChange={e => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div className={'btn-strip'}>
                    <label>Custom URL* <br/>
                        <input className={'input'} type="text" name="title"
                               placeholder={'e.g: http://markbasa.com '}
                               required
                               value={customURL} onChange={e => setCustomURL(e.target.value)}


                        />
                    </label>
                </div>
                <div className={'btn-strip'}>
                    <label>Email* <br/>
                        <input className={'input'} type="text" name="title" placeholder={'e.g: markbasa@gmail.com '}
                               required
                               value={email} onChange={e => setEmail(e.target.value)}

                        />
                    </label>
                </div>
                <div className={'btn-strip '}>
                    <label className={''}>Short Bio* <br/>
                        <textarea className={'input '} name="title" placeholder={'e.g: markbasa@gmail.com '}
                                  required
                                  value={bio} onChange={e => setBio(e.target.value)}
                                  rows={30} cols={40}
                        >

                        </textarea>
                    </label>
                </div>

                <div className={'btn-strip '}>
                    <label className={''}>Social Links* <br/>
                    </label>

                </div>
                <p>add your existing social links to build a strong reputation</p>
                <div className={'btn-strip'}>
                    <label>Facebook <br/>
                        <input className={'input'} type="text" name="title" placeholder={'e.g: @ Mark Basa '}
                               required
                               value={facebook} onChange={e => setFacebook(e.target.value)}

                        />

                    </label>
                    <button>Connect</button>

                </div>
                <div className={'btn-strip'}>
                    <label>Twitter <br/>
                        <input className={'input'} type="text" name="title" placeholder={'e.g: @ Mark Basa '}
                               required
                               value={twitter} onChange={e => setTwitter(e.target.value)}

                        />

                    </label>
                    <button>Connect</button>
                </div>
                <Button1 type={'submit'}>Save Settings</Button1>
            </Column>
        </Container>
        <Footer/>
    </div>)
}

export default EditProfile;