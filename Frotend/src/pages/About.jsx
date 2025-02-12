import { Box, Container, Typography, Button, TextField, Grid2 as Grid, Paper, IconButton, Avatar } from "@mui/material";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import { useState } from "react";
import { Instagram, WhatsApp } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import photo from "../../public/assets/MyPhoto.jpg"
import { greenBorder, violetBorder } from "../constants/colors";
import AppLayout from "../components/layout/AppLayout";
import { useCustomMutation } from "../hooks/hooks";
import { useNewContactUSMutation } from "../redux/api/api";

// Define a subtle animation for icons
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const About = () => {
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", message: "" });

  const [newContactUS]= useCustomMutation(useNewContactUSMutation, "Sending Message...");

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newContactUS(contactInfo);
    setContactInfo({ name: "", email: "", message: "" }); 
  };

  return (
    <div
        style={{
            backgroundColor:"white"
        }}
    >
        <Container maxWidth="md"
        sx={{ 
        py: 5,
        }}>
      {/* About Us Section */}
      <Box textAlign="center" py={5} sx={{ backgroundColor: "background.paper", borderRadius: 2, p: 3 }}>
        <SportsCricketIcon sx={{ fontSize: 60, color: "primary.main", animation: `${bounce} 2s infinite` }} />
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Experience Cricket Like Never Before!
        </Typography>
      </Box>

      {/* What We Offer Section */}
      <Box textAlign="center" my={5} sx={{ backgroundColor: "background.paper", borderRadius: 2, p: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🏆 What We Offer?
        </Typography>
        <Typography variant="body1" color="textSecondary">
          ✔ <strong>Live Match Updates</strong> – Stay on top of every ball, boundary, and wicket.
          <br />
          ✔ <strong>Team & Player Stats</strong> – Dive deep into match performances and career records.
          <br />
          ✔ <strong>League Standings</strong> – Track your team’s position in the tournament.
          <br />
          ✔ <strong>Match Highlights</strong> – Key moments and match-winning performances.
          <br />
          ✔ <strong>Venues & Schedules</strong> – Get details on stadiums and upcoming fixtures.
        </Typography>
      </Box>

      {/* Our Mission Section */}
      <Box textAlign="center" my={5} sx={{ backgroundColor: "background.paper", borderRadius: 2, p: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🎯 Our Mission
        </Typography>
        <Typography variant="body1" color="textSecondary">
          We aim to create a seamless and immersive cricketing experience for fans worldwide by providing{" "}
          <strong>real-time</strong> and <strong>accurate</strong> match data.
        </Typography>
      </Box>

      {/* Why Choose Us Section */}
      <Box textAlign="center" my={5} sx={{ backgroundColor: "background.paper", borderRadius: 2, p: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          💡 Why Choose Us?
        </Typography>
        <Typography variant="body1" color="textSecondary">
          ⚡ Fast & Reliable Updates <br />
          📊 Intuitive & User-Friendly Design <br />
          📅 Complete Tournament Coverage <br />
          {/* 📣 Engaging Community Features (Coming Soon!) */}
        </Typography>
      </Box>

      {/* Meet the Creator Section */}
      <Box textAlign="center" my={5} sx={{ backgroundColor: "background.paper", borderRadius: 2, p: 3 }}>
         {/* Profile Photo */}
  
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          👨‍💻 Meet the Creator
        </Typography>

        
        <Typography variant="h6" color="textSecondary" paragraph>
          Hi, I'm <strong>Vivek</strong>, a passionate full-stack developer specializing in the MERN stack.
          I love building scalable web applications and working with modern technologies like React, Node.js, and MongoDB.
        </Typography>

        <Typography variant="h6" color="textSecondary" paragraph>
          🚀 Skills: Java, React.js, Node.js, Express.js, MongoDB, JavaScript, WebSockets <br></br>  
          🎯 Experience: Developed multiple projects, including a Cricket Scoreboard Application, Chat Application & E-commerce platform. <br></br> 
          📩 Contact: <strong>jadhavvivek2604@gmail.com</strong>  
        </Typography>

        <Box mt={4}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            Connect with me:
          </Typography>

          <Avatar
    src={photo}
    // alt="Wim's Photo"
    sx={{
      width: 200,
      height: 200,
      margin: "auto",
      mb: 2,
      boxShadow: 3,
      border: `2px solid ${greenBorder}`,
    }}
  />

          {/* Social Media Icons */}
          <Box mt={1}>
            <IconButton
              component="a"
              href="https://www.instagram.com/he_is_vivek.07/"
              target="_blank"
              rel="noopener noreferrer"
              color="secondary"
              sx={{ "&:hover": { transform: "scale(1.2)", transition: "transform 0.3s" } }}
            >
              <Instagram fontSize="large" />
            </IconButton>

            <IconButton
              component="a"
              href="https://wa.me/9022708293"
              target="_blank"
              rel="noopener noreferrer"
              color="success"
              sx={{ "&:hover": { transform: "scale(1.2)", transition: "transform 0.3s" } }}
            >
              <WhatsApp fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="h6" fontWeight="bold" color="primary" mt={2}>
          "Turning Ideas into Reality through Code"
        </Typography>
      </Box>

      {/* Contact Us Section */}
      <Box textAlign="center" my={5}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          📩 Contact Us
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Have questions or suggestions? Reach out to us!
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 5, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item size={{xs:12}} >
              <TextField
                label="Name"
                name="name"
                fullWidth
                required
                value={contactInfo.name}
                onChange={handleChange}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item size={{xs:12}}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                value={contactInfo.email}
                onChange={handleChange}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item size={{xs:12}}>
              <TextField
                label="Message"
                name="message"
                multiline
                rows={4}
                fullWidth
                required
                value={contactInfo.message}
                onChange={handleChange}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
          </Grid>
          <Box textAlign="center" mt={3}>
            <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 2, px: 4, py: 1 }}>
              Send Message
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
    </div>
    
  );
};

export default AppLayout(About) ;