export const postJoke = (inputJokes) => {
    const dataToSend = {
      text: inputJokes,
      told: false,
    };
  
    return fetch("http://localhost:8088/jokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        
        return response.json();
      })
      
      
  };
  
  
  export const getAllTheJokes = () => {
    return fetch("http://localhost:8088/jokes").then((res) => res.json())
  }

  

      
      

  export const updateJoke = (editedJoke) => {
    return fetch(`http://localhost:8088/jokes/${editedJoke.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedJoke),
    });
  };
  
  export const deleteJoke = (jokeId) => {
    return fetch(`http://localhost:8088/jokes/${jokeId}`, {
      method: "DELETE",
    });
  };