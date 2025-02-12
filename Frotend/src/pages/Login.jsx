import React, { useEffect, useState } from 'react'
import { Stack, Typography, Container, TextField, Paper, Button, Avatar, IconButton } from "@mui/material"
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { VisuallyHiddenInput } from '../components/styled/StyledComponents';
import { useLogInMutation, useSignUpMutation } from '../redux/api/api';
import { userExist, userNotExist } from '../redux/reducers/auth';
import { useCustomMutation } from '../hooks/hooks';

const Login = () => {

    const dispatch = useDispatch()

    const [isLogin, setIslogin] = useState(true)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState(null)
    const [avatarSrc, setAvatarSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const [signUp,res]=useCustomMutation(useSignUpMutation,"Signing Up...")
    const [login,loginRes]=useCustomMutation(useLogInMutation,"Logging In...")

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setAvatar(file)
        if (file) {

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                setAvatarSrc(reader.result); 
            };

        }
    };

    // const signUpHandler = async (e) => {
    //     e.preventDefault()
    //     const formData=new FormData()
    //     formData.append("name",name)
    //     formData.append("username",username)
    //     formData.append("password",password)
    //     formData.append("avatar",avatar)

    //     try{
    //         let toastId=toast.loading("Signing Up...")
    //        const res= await signUP(formData)
    //        console.log(res)
    //        if(res.data){
    //             dispatch(userExist(res.data.user))
    //          toast.success(res.data.message,{id:toastId})
    //        }else{
    //         dispatch(userNotExist())
    //         toast.error(res.error.data.message,{id:toastId})
    //        }
    //     }catch(err){
    //         console.log(err)
    //         toast.error("Something Went Wrong!")
    //     }
        
    // }

    const signUpHandler = async (e) => {
        e.preventDefault()
        const formData=new FormData()
        formData.append("name",name)
        formData.append("username",username)
        formData.append("password",password)
        formData.append("avatar",avatar)

        await signUp(formData)
    }


    const loginHandler = async (e) => {
        e.preventDefault()
        await login({username,password})
    }

    useEffect(()=>{
        if(loginRes && loginRes.data){
            dispatch(userExist(loginRes.data.user))
        }else{
            if(loginRes){
                dispatch(userNotExist())
            }
        }
    },[dispatch,loginRes])

    useEffect(()=>{
        if(res && res.data){
            dispatch(userExist(res.data.user))
        }else{
            if(res){
                dispatch(userNotExist())
            }
        }
    },[dispatch,res])

    return (
        <div 
        style={{
            backgroundColor: "rgba(192, 192, 192, 0.3)", // Silver color with transparency
            backdropFilter: "blur(10px)", // Blur effect for the background
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Container maxWidth="sm"
                sx={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Paper
                    elevation={5}
                    sx={{
                        padding: 4,
                        margin: 4,
                        width: "80%",
                        maxHeight: "90%",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "12px",
                        overflow: "auto",
                        "&::-webkit-scrollbar": {
                            display: "none"
                        }

                    }}
                >
                    {
                        isLogin ?
                            <>
                                <Typography
                                    variant='h5'
                                    sx={{
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        color: "#333", // Dark text for contrast
                                        marginBottom: "1.5rem",
                                    }}
                                >Login</Typography>
                                <form
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <TextField
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        label="Username"
                                        fullWidth
                                        margin="normal"
                                        sx={{
                                            backgroundColor: "rgba(255, 255, 255, 0.8)", // Light background for input
                                            borderRadius: "8px",
                                          }}
                                    />
                                    <TextField
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        label="Password"
                                        type='password'
                                        margin="normal"
                                        fullWidth
                                        sx={{
                                            backgroundColor: "rgba(255, 255, 255, 0.8)", // Light background for input
                                            borderRadius: "8px",
                                          }}
                                    />

                                    <Button
                                        variant='contained'
                                        fullWidth
                                        sx={{
                                            margin: "1.5rem 0",
                                            backgroundColor: "#4CAF50", // Green color for the button
                                            color: "#fff",
                                            fontWeight: "bold",
                                            "&:hover": {
                                              backgroundColor: "#45a049", // Darker green on hover
                                            },
                                          }}
                                        disabled={isLoading}
                                        onClick={loginHandler}

                                    > Login
                                    </Button>

                                    <Typography

sx={{
    textAlign: "center",
    color: "#666", // Gray text for "OR"
    margin: "1rem 0",
  }}


                                    >
                                        OR
                                    </Typography>
                                    <Button
                                        variant='outlined'
                                        fullWidth
                                        disabled={isLoading}
                                        onClick={() => setIslogin(false)}
                                        sx={{
                                            margin: "1rem 0",
                                            borderColor: "#4CAF50", // Green border
                                            color: "#4CAF50", // Green text
                                            fontWeight: "bold",
                                            "&:hover": {
                                              backgroundColor: "#4CAF50", // Green background on hover
                                              color: "#fff",
                                            },
                                          }}

                                    > Sign up
                                    </Button>
                                </form>

                            </> :

                            <><Typography
                                variant='h5'
                                sx={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    color: "#333", // Dark text for contrast
                                    marginBottom: "1.5rem",
                                  }}
                            >Sign Up</Typography>
                                <form
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "1rem"

                                    }}
                                >
                                    <Stack
                                        sx={{
                                            position: "relative",
                                            height: "8rem",
                                            width: "8rem",
                                        }}>
                                        <Avatar
                                            src={avatarSrc}
                                            sx={{
                                                height: "8rem",
                                                width: "8rem",
                                                border: "2px solid #4CAF50"
                                            }}
                                        ></Avatar>
                                        <IconButton
                                            sx={{
                                                position: "absolute",
                                                right: "-0.4rem",
                                                bottom: "-0.4rem",
                                                zIndex: "10",
                                                backgroundColor: "rgba(76, 175, 80, 0.7)", // Green background for icon
                                                "&:hover": {
                                                  backgroundColor: "rgba(76, 175, 80, 0.9)", // Darker green on hover
                                                },
                                                color: "white",
                                              }}
                                            component="label"
                                        ><>
                                                <CameraAltIcon />
                                                <VisuallyHiddenInput
                                                    type='file'
                                                    accept='image/*'
                                                    onChange={handleFileChange} />
                                            </>


                                        </IconButton>

                                    </Stack>
                                    <Typography mt={"10px"} variant='caption' color='secondary'>
                                        Upload File Less Than 5MB
                                    </Typography>

                                    <TextField
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        label="Name"
                                        fullWidth
                                        margin="normal"
                                        sx={{
                                            backgroundColor: "rgba(255, 255, 255, 0.8)", // Light background for input
                                            borderRadius: "8px",
                                            mt: "1rem"
                                          }}
                                    />
                                    <TextField
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        label="Username"
                                        fullWidth
                                        margin="normal"
                                        sx={{
                                            backgroundColor: "rgba(255, 255, 255, 0.8)", // Light background for input
                                            borderRadius: "8px",
                                          }}
                                    />
                                    <TextField
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        label="Password"
                                        type='password'
                                        margin="normal"
                                        fullWidth
                                        sx={{
                                            backgroundColor: "rgba(255, 255, 255, 0.8)", // Light background for input
                                            borderRadius: "8px",
                                          }}
                                    />

                                    <Button
                                        variant='contained'
                                        fullWidth
                                        sx={{
                                            margin: "1.5rem 0",
                                            backgroundColor: "#4CAF50", // Green color for the button
                                            color: "#fff",
                                            fontWeight: "bold",
                                            "&:hover": {
                                              backgroundColor: "#45a049", // Darker green on hover
                                            },
                                          }}
                                        disabled={isLoading}
                                        onClick={signUpHandler}
                                    > Sign Up
                                    </Button>

                                    <Typography
                                        sx={{
                                            textAlign: "center"
                                        }}
                                    >
                                        OR
                                    </Typography>
                                    <Button
                                        variant='outlined'
                                        fullWidth
                                        sx={{
                                            margin: "1rem 0",
                                            borderColor: "#4CAF50", // Green border
                                            color: "#4CAF50", // Green text
                                            fontWeight: "bold",
                                            "&:hover": {
                                              backgroundColor: "#4CAF50", // Green background on hover
                                              color: "#fff",
                                            },
                                          }}
                                        disabled={isLoading}
                                        onClick={() => setIslogin(true)}
                                    > Login
                                    </Button>
                                </form>
                            </>
                    }
                </Paper>
            </Container>
        </div>
    )
}

export default Login