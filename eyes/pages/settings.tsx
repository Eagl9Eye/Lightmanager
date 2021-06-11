import {
  Image,
  Container,
  Header,
  Divider,
  Segment,
  Message,
  Icon,
  Grid,
  Button,
  Input,
  Modal,
  List,
} from "semantic-ui-react";
import Page, { Logging } from "../components";
import { useState } from "react";
import axios, { CancelTokenSource } from "axios";

interface AddressRequest {
  address: string;
}

export default function Home() {
  const cancelToken = axios.CancelToken;
  const [address, setAddress] = useState("");
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
  };

  return (
    <Page>
      <Header as="h1">
        Einstellungen
        <Header.Subheader>
          Logging, Verwaltung von IP-Adressen und Informationen zur Software
        </Header.Subheader>
      </Header>
      <Segment vertical>
        <Container fluid id="log">
          <Header as="h3">Logging</Header>
          <Logging></Logging>
        </Container>
      </Segment>
      <Segment vertical>
        <Divider hidden />
        <Container fluid id="address">
          <Header as="h3">Adressen</Header>
          <Segment placeholder>
            <Grid columns={2} stackable textAlign="center" verticalAlign="middle">
              <Divider vertical>Oder</Divider>
              <Grid.Row>
                <Grid.Column>
                  <Header icon>
                    <Icon name="list alternate outline" />
                    Namensliste laden
                  </Header>
                  <Button primary>Laden</Button>
                </Grid.Column>
                <Grid.Column>
                  <Header icon>
                    <Icon name="microchip" />
                    Lightmanager-Adresse ändern
                  </Header>
                  <List>
                    <List.Item>
                      <Input
                        type="text"
                        size="large"
                        value={address}
                        onChange={(e, { value }) => setAddress(value)}
                        placeholder="lightmanager"
                        style={{ display: "flex" }}
                      />
                    </List.Item>
                    <List.Item>
                      <Modal
                        trigger={
                          <Button primary content="Umstellen" onClick={changeAddress} />
                        }
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
                          <Modal.Content>
                            Änderung der Adresse wird vorgenommen
                          </Modal.Content>
                        ) : null}
                        <Modal.Actions>
                          <Button negative onClick={() => handleCancelClick()}>
                            Abbrechen
                          </Button>
                          <Button
                            loading={loading}
                            positive
                            onClick={() => setOpen(false)}
                          >
                            Schließen
                          </Button>
                        </Modal.Actions>
                      </Modal>
                    </List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </Segment>
      <Segment vertical>
        <Divider hidden />
        <Container fluid id="version">
          <Header as="h3">Version</Header>
          <Message info>
            <Message.Header>
              <Icon name="info" />
              0.0.9
            </Message.Header>
          </Message>
        </Container>
      </Segment>
    </Page>
  );
}
