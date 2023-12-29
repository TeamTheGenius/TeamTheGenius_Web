function GoogleOauth() {
  const code = new URL(window.location.href).searchParams.get("code");

  /*
  useEffect(() => {
    fetch(`API PATH/code=${code}`)
      .then((response) => {
        console.log(response);
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  */
}

export default GoogleOauth;
