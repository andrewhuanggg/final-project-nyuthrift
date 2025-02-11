import axios from 'axios';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListingsIcon = ({ productName, listedPrice, listingId, date, imageUrl, id, onDelete }) => {
  
  const navigate = useNavigate();


  const handleViewClick = () => {
    navigate(`/product-listing/${listingId}`);
  }

    

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this listing?');
    if(confirmDelete) {
      try{
        const response = await axios.delete(`http://localhost:3000/api/delete/${listingId}`)
        if(response.status === 200) {
          console.log('Deleted Listing ')
          onDelete(listingId)
        }
      } catch(error){
        console.log("error deleting listing", error);
      }
    }
    
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const year = date.getFullYear().toString().slice(-2);
  
    return `${month}/${day}/${year}`;
  }

  console.log(imageUrl);
  return (
    <Box display="flex" justifyContent="center" marginBottom={2}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={imageUrl} alt={productName} onClick={handleViewClick}/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Listed Price: ${listedPrice}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Highest Offer: {offerPrice}
            </Typography> */}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button size="small" variant="contained" onClick={handleViewClick}>
              View
            </Button>
            <Button size="small" variant="contained" color="error" onClick={handleDeleteClick}>
              Delete
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Listed on: {formatDate(date)}
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ListingsIcon;
