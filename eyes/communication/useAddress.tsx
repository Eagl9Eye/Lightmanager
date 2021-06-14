/*
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [cancelTokenSource, setCancelTokenSource]: [
    CancelTokenSource,
    (cancelTokenSource: CancelTokenSource) => void
  ] = useState(cancelToken.source());

  const handleCancelClick = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Abgebrochen");
      setOpen(false);
    }
  };

  const changeAddress = () => {
    <Modal
    trigger={<Button primary content="Umstellen" onClick={changeAddress} />}
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    dimmer="blurring"
    open={open}
  >
    <Modal.Header>
      {error === ""
        ? loading
          ? "Adresse wurde erflogreich geändert"
          : "Adresse wird validiert"
        : error}
    </Modal.Header>
    {error === "" && loading ? (
      <Modal.Content>Änderung der Adresse wird vorgenommen</Modal.Content>
    ) : null}
    <Modal.Actions>
      <Button negative onClick={() => handleCancelClick()}>
        Abbrechen
      </Button>
      <Button loading={loading} positive onClick={() => setOpen(false)}>
        Schließen
      </Button>
    </Modal.Actions>
  </Modal>
    axios
      .post<AddressRequest>(
        `${process.env.backend.host}:${process.env.backend.port}/v1/parameter`,
        {
          address: address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          cancelToken: cancelTokenSource.token,
          timeout: 10000,
        }
      )
      .then((response) => {
        setAddress(response.data.address);
        setLoading(false);
      }) // das hier in eigene Komponente & oeffnen verbessern
      .catch((ex) => {
        console.log(ex);
        const error =
          ex.code === "ECONNABORTED"
            ? "A timeout has occurred"
            : ex.response.status === 404
            ? "Resource not found"
            : "An unexpected error has occurred";
        setError(error);
        setLoading(false);
      });
  };*/
